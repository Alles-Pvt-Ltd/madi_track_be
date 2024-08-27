"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
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
class Logger {
}
exports.Logger = Logger;
Logger.errorLogger = (data) => {
    logger.error(data);
};
Logger.infoLog = (data) => {
    logger.info(data);
};
