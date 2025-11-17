import pino, { Logger } from "pino";

export const logger: Logger = pino({
  browser: {
    asObject: true // Log as objects in the browser for better structure
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: "SYS:HH:MM:ss",
      ignore: "pid,hostname"
    }
  },
  level: process.env.PINO_LOG_LEVEL || "info",
  redact: ["password", "creditCardNumber"]
});
