"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const service_1 = require("../modules/common/service");
const app_function_1 = require("../app/app_function");
class Verify {
    verify(req, res, next) {
        const token = req.header("token");
        if (!token) {
            return (0, service_1.forbidden)("Access Denied", req.body, res);
        }
        const verified = app_function_1.AppFunction.jwtVerify(token);
        if (!verified) {
            return (0, service_1.forbidden)("Invalid token", req.body, res);
        }
        req.user = verified;
        next();
    }
}
exports.Verify = Verify;
