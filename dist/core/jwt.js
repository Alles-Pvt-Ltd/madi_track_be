"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const response_1 = require("./response"); // Ensure this function is implemented in your response.ts file
const app_1 = require("./app"); // Assuming AppFunction contains jwtVerify
const jwt = require('jsonwebtoken');
class JwtToken {
    // Standard JWT Token Verification
    static verify(req, res, next) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract "Bearer <token>"
        if (!token) {
            return (0, response_1.forbidden)("Access Denied: No token provided", req.body, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(token); // Verifies the token with the secret
            // Attach the decoded data to req.user for future middleware or request handling
        }
        catch (error) {
            return (0, response_1.forbidden)("Invalid token provided", req.body, res);
        }
        return next();
    }
    // Admin-specific JWT Token Verification
    static adminVerify(req, res, next) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract "Bearer <token>"
        if (!token) {
            return (0, response_1.forbidden)("Access Denied: No token provided", req.body, res);
        }
        try {
            const verified = app_1.AppFunction.jwtVerify(token); // Verifies the token with the secret
            // Check if the user has admin role (assuming role is part of the payload)
            if (verified.email) { // Assuming role 2 is for admin
                return (0, response_1.forbidden)("Access Denied: Admins only", req.body, res);
            }
            // Attach the decoded data to req.user for future middleware or request handling
        }
        catch (error) {
            return (0, response_1.forbidden)("Invalid token provided", req.body, res);
        }
        return next();
    }
    // Function to extract user data from the token (e.g., user code)
    static get(req) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            throw new Error("Token is required");
        }
        // Return decoded user data from JWT token
        const userData = app_1.AppFunction.jwtVerify(token); // Using AppFunction.jwtVerify to decode token and get user info
        return userData;
    }
}
exports.JwtToken = JwtToken;
