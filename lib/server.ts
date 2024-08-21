import {application } from "express";
import app from "./app";
import env from './config/environment';
const PORT = env.getPort();
import { Logger } from "./core/common/logger";

app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
});


process.on("uncaughtException", function (err) {
   Logger.errorLogger(err.stack ? err.stack : err);
   console.log("UncaughtException : %s", err.stack ? err.stack : err);
 });
