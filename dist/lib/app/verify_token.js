"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const service_1 = require("../modules/common/service");
const app_function_1 = require("../app/app_function");
class Verify {
    verify(req, res, next) {
        const verifyToken = req.header('auth_token'); //when we login we store token in header in the name of auth_token,so we get token from header
        // if verify token not in header
        if (!verifyToken) {
            return (0, service_1.forbidden)('Access Denited', req.body, res);
        }
        try {
            // if we have token in header that we are going to verify 
            const verified = app_function_1.AppFucntion.jwtVerify(verifyToken);
            req.user = verified;
            // we store verified value in to res.user ,here verified will have the user id because when we create token we gave user id in login 
            // req.user:<any>=verified;
        }
        catch (error) {
            // invalid token
            return (0, service_1.forbidden)('in valid token', req.body, res);
        }
        return next();
    }
}
exports.Verify = Verify;
