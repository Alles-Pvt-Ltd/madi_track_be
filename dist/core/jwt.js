"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const response_1 = require("./response");
const app_1 = require("./app");
class JwtToken {
    static verify(req, res, next) {
        const verifyToken = req.header("token");
        if (!verifyToken) {
            return (0, response_1.forbidden)("Access Denied: Token is missing", {}, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(verifyToken);
            req.user = verified;
            next();
        }
        catch (error) {
            return (0, response_1.forbidden)("Invalid token", {}, res);
        }
    }
    static get(req) {
        const verifyToken = req.header("token");
        try {
            return app_1.AppFunction.jwtVerify(verifyToken);
        }
        catch (_a) {
            return null;
        }
    }
    static adminVerify(req, res, next) {
        const verifyToken = req.header("token");
        if (!verifyToken) {
            return (0, response_1.forbidden)("Access Denied, please check you are providing correct token", req.body, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(verifyToken); // Ensure it contains userId
            if (verified.userId !== 2) { // Ensure userId is compared as a number
                return (0, response_1.forbidden)("Access Denied", req.body, res);
            }
            req.user = verified;
        }
        catch (error) {
            return (0, response_1.forbidden)("Please provide valid token", req.body, res);
        }
        return next();
    }
}
exports.JwtToken = JwtToken;
