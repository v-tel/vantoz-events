type Level = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const MIN_LEVEL: Level = (process.env.LOG_LEVEL as Level) || "debug";

function shouldLog(level: Level) {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[MIN_LEVEL];
}

function format(level: Level, tag: string, message: string, context?: Record<string, unknown>) {
  const time = new Date().toISOString().split("T")[1]?.replace("Z", "") ?? "";
  const base = `[${time}] ${level.toUpperCase().padEnd(5)} [${tag}] ${message}`;
  return context && Object.keys(context).length > 0 ? `${base} ${JSON.stringify(context)}` : base;
}

/**
 * Usage:
 *   const logger = createLogger("api:quote");
 *   logger.info("db-insert: ok", { id: 42 });
 *   logger.error("db-insert: failed", { err, input: d });
 *
 * Set LOG_LEVEL=warn (or info/error) in .env.local to quiet things down.
 * Defaults to "debug" so you see everything locally.
 */
export function createLogger(tag: string) {
  return {
    debug(message: string, context?: Record<string, unknown>) {
      if (shouldLog("debug")) console.debug(format("debug", tag, message, context));
    },
    info(message: string, context?: Record<string, unknown>) {
      if (shouldLog("info")) console.info(format("info", tag, message, context));
    },
    warn(message: string, context?: Record<string, unknown>) {
      if (shouldLog("warn")) console.warn(format("warn", tag, message, context));
    },
    error(message: string, context?: Record<string, unknown> & { err?: unknown }) {
      if (!shouldLog("error")) return;
      const { err, ...rest } = context ?? {};
      const errInfo =
        err instanceof Error ? { message: err.message, stack: err.stack } : err;
      console.error(
        format("error", tag, message, { ...rest, ...(errInfo ? { err: errInfo } : {}) })
      );
    },
  };
}