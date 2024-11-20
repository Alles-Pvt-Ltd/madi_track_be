"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../core/app");
class Helper {
    static getToken(username, role) {
        if (!Number.isInteger(role)) {
            throw new Error("Role must be an integer");
        }
        const token = app_1.AppFunction.createJwtToken(username, role);
        return { token };
    }
}
exports.default = Helper;
