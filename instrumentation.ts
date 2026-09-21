/**
 * Runs once, before the Next.js server starts handling requests.
 *
 * Fix for: NeonDbError "fetch failed" / "Network is unreachable" on IPv6.
 * This machine's DNS returns IPv6 addresses for hosts like Neon's pooler,
 * but has no working IPv6 route. Node's fetch (unlike curl) doesn't always
 * fall back to IPv4 automatically, so the very first connection attempt
 * fails outright. Forcing ipv4first here makes Node try IPv4 addresses
 * first for every DNS lookup in this process, sidestepping the broken
 * IPv6 route without needing to disable IPv6 at the OS level (which is
 * fragile and can get silently re-enabled, as happened here).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    dns.setDefaultResultOrder("ipv4first");
  }
}