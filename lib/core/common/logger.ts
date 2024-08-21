const winston = require("winston");
require("winston-daily-rotate-file");

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "./log/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "10d",
});

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "reload" },
  transports: [fileRotateTransport],
});

export class Logger {
  public static errorLogger = (data: any) => {
    logger.error(data);
  };

  public static infoLog = (data: any) => {
    logger.info(data);
  };
}
