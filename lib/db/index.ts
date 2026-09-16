import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local — see the setup notes in README.md."
  );
}

// HTTP-based driver (port 443, same as any website) instead of raw
// Postgres TCP (port 5432) -- some networks block 5432 outbound while
// always allowing HTTPS. Now that IPv6 is disabled system-wide, the
// earlier "fetch failed" issue with this driver should be resolved too.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
