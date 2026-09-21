import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";
import { createLogger } from "@/lib/logger";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local — see the setup notes in README.md."
  );
}

const dbLogger = createLogger("db");

// Neon's driver docs: fetchFunction can only be set via the global
// neonConfig object -- passing it as an option to neon(url, options)
// is silently ignored. (This was the bug: our previous retry wrapper
// was never actually being invoked.)
//
// This wraps every query's underlying fetch with a small retry. Two
// distinct failure modes are worth retrying transparently instead of
// surfacing to the user:
//   1. Compute cold start (Neon free tier autosuspends after idle) --
//      the first request after a suspend can be slow enough to fail.
//   2. Raw "TypeError: fetch failed" -- a network-layer failure to
//      reach Neon's endpoint at all (seen recurring in this project,
//      previously partially mitigated by disabling IPv6 system-wide).
//      This is worth retrying too, since it has consistently resolved
//      itself on the very next attempt.
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = [400, 900]; // one entry per retry attempt

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const retryingFetch: typeof fetch = async (input, init) => {
  dbLogger.debug("retryingFetch invoked", {
    url: typeof input === "string" ? input : input.toString(),
  });

  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(input, init);

      // Only retry on server-side failure (likely cold start / transient).
      // A 4xx is a real error (bad query, auth, etc.) -- don't retry that.
      if (response.ok || response.status < 500) {
        if (attempt > 0) {
          dbLogger.debug("query succeeded after retry", { attempt });
        }
        return response;
      }

      lastError = new Error(`Neon fetch returned status ${response.status}`);
    } catch (err) {
      // This is where a raw "TypeError: fetch failed" lands.
      lastError = err;
    }

    if (attempt < MAX_RETRIES) {
      dbLogger.debug("query failed, retrying", {
        attempt: attempt + 1,
        delayMs: RETRY_DELAY_MS[attempt],
        reason: lastError instanceof Error ? lastError.message : String(lastError),
      });
      await sleep(RETRY_DELAY_MS[attempt]);
    }
  }

  dbLogger.debug("query failed after all retries", { attempts: MAX_RETRIES + 1 });
  throw lastError;
};

// fetchFunction is a GLOBAL-only config option -- must be set on
// neonConfig, not passed into neon(url, options). See comment above.
neonConfig.fetchFunction = retryingFetch;

// HTTP-based driver (port 443, same as any website) instead of raw
// Postgres TCP (port 5432) -- some networks block 5432 outbound while
// always allowing HTTPS.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
  // Prints every query + params to the terminal in dev, so a bad query
  // or unexpected value is visible immediately instead of surfacing as
  // a vague 500 three layers up. Silent in production.
  logger:
    process.env.NODE_ENV !== "production"
      ? {
          logQuery(query, params) {
            dbLogger.debug("query", { query, params });
          },
        }
      : false,
});
