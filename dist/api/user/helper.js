"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../core/app");
class Helper {
}
exports.default = Helper;
Helper.getToken = (username, email) => {
    const token = app_1.AppFunction.createJwtToken(username, email);
    return { token };
};
