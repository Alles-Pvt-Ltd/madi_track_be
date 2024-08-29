"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const environment_1 = require("./config/environment");
const PORT = environment_1.default.getPort();
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
