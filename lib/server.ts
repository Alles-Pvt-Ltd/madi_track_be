import {application } from "express";
import app from "./app";
import env from './config/environment';
const PORT = env.getPort();

app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
});
