import pino, { type LoggerOptions, type Logger } from "pino";

const isBrowser = typeof window !== "undefined";
const baseLevel = process.env.PINO_LOG_LEVEL || "info";

function buildOptions(): LoggerOptions {
  const shared: LoggerOptions = {
    level: baseLevel,
    redact: ["password", "creditCardNumber"]
  };

  if (isBrowser) {
    return {
      ...shared,
      browser: {
        asObject: true
      }
    };
  }

  if (process.env.NODE_ENV !== "production") {
    return {
      ...shared,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "SYS:HH:MM:ss",
          ignore: "pid,hostname"
        }
      }
    };
  }

  return shared;
}

export const logger: Logger = pino(buildOptions());
