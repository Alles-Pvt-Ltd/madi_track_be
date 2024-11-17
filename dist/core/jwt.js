"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const response_1 = require("./response");
const app_1 = require("./app");
const jwt = require('jsonwebtoken');
class JwtToken {
    static verify(req, res, next) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return (0, response_1.forbidden)("Access Denied: No token provided", req.body, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(token);
        }
        catch (error) {
            return (0, response_1.forbidden)("Invalid token provided", req.body, res);
        }
        return next();
    }
    static get(req) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new Error("Token is required");
        }
        const userData = app_1.AppFunction.jwtVerify(token);
        return userData;
    }
}
exports.JwtToken = JwtToken;
