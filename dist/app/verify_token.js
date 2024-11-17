"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const service_1 = require("../modules/common/service");
const app_function_1 = require("../app/app_function");
class Verify {
    verify(req, res, next) {
        const verifyToken = req.header('token');
        if (!verifyToken) {
            return (0, service_1.forbidden)('Access Denied', req.body, res);
        }
        try {
            const verified = app_function_1.AppFunction.jwtVerify(verifyToken);
            req.user = verified;
        }
        catch (error) {
            return (0, service_1.forbidden)('Invalid token', req.body, res);
        }
        return next();
    }
}
exports.Verify = Verify;
