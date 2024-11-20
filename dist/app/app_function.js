"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFunction = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AppFunction {
    static isInt(n) {
        return Number.isInteger(Number(n));
    }
    static isFloat(n) {
        return !Number.isInteger(Number(n)) && !isNaN(parseFloat(n));
    }
    static isString(s) {
        return typeof s === "string" && s.trim().length > 0;
    }
    static contentType(req) {
        const contentType = req.get("Content-Type");
        return contentType && contentType.includes("application/json") ? "json" : "others";
    }
    static trimAndLowercase(str) {
        return str.toLowerCase().trim();
    }
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return bcrypt.hash(password, saltRounds);
        });
    }
    static passwordVerify(inputPassword, storedHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(inputPassword, storedHash);
        });
    }
    static createJwtToken(username, email) {
        const payload = { username, email };
        const secret = process.env.JWT_SECRET || "your_jwt_secret";
        return jwt.sign(payload, secret, { expiresIn: "1h" });
    }
    static jwtVerify(token) {
        try {
            const secret = process.env.JWT_SECRET || "your_jwt_secret";
            return jwt.verify(token, secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.AppFunction = AppFunction;
