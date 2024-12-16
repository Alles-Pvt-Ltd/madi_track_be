"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const service_1 = require("../modules/common/service");
const app_function_1 = require("../app/app_function");
class Verify {
    verify(req, res, next) {
        const token = req.header('token'); // Use `req.header` to retrieve the token
        if (!token) {
            return (0, service_1.forbidden)("Access Denied: No token provided", req.body, res);
        }
        try {
            const verified = app_function_1.AppFunction.jwtVerify(token); // Verify the token using AppFunction.jwtVerify
            if (!verified) {
                return (0, service_1.forbidden)("Invalid token provided", req.body, res);
            }
            req.user = verified; // Attach the verified user data to the request object
        }
        catch (error) {
            return (0, service_1.forbidden)("Invalid token provided", req.body, res);
        }
        next();
    }
}
exports.Verify = Verify;
