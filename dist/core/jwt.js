"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const response_1 = require("./response");
const app_1 = require("./app");
class JwtToken {
    static verify(req, res, next) {
        const verifyToken = req.header("token");
        if (!verifyToken) {
            return (0, response_1.forbidden)("Access Denied, please check you are providing correct token", req.body, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(verifyToken);
            req.user = verified;
        }
        catch (error) {
            return (0, response_1.forbidden)("Please provide valid token", req.body, res);
        }
        const token = app_1.AppFunction.jwtVerify(req.header("token"));
        if (!token.code) {
            return (0, response_1.forbidden)("Please provide valid token", token, res);
        }
        return next();
    }
    static get(req) {
        const verifyToken = req.header("token");
        return app_1.AppFunction.jwtVerify(verifyToken);
    }
}
exports.JwtToken = JwtToken;
