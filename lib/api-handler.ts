import { createLogger } from "@/lib/logger";

/**
 * Usage in a route:
 *
 *   const logger = createLogger("api:quote");
 *
 *   try {
 *     await db.insert(...)
 *     logger.info("db-insert: ok", { id })
 *   } catch (err) {
 *     logger.error("db-insert: failed", { err, input: d })
 *     return NextResponse.json({ error: "..." }, { status: 500 })
 *   }
 *
 * This file just re-exports createLogger under a route-friendly name so
 * every API route logs with a consistent "api:<route>" tag. Keeping the
 * try/catch explicit in each route (rather than a generic wrapper) means
 * you can still tailor the user-facing error message and status per step,
 * which is what the quote/contact routes already do well.
 */
export function createRouteLogger(routeName: string) {
  return { logger: createLogger(`api:${routeName}`) };
}