"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const environment_1 = require("./config/environment");
const PORT = environment_1.default.getPort();
const logger_1 = require("./core/common/logger");
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
process.on("uncaughtException", function (err) {
    logger_1.Logger.errorLogger(err.stack ? err.stack : err);
    console.log("UncaughtException : %s", err.stack ? err.stack : err);
});
