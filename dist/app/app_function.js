"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFunction = void 0;
const password_hash = require("password-hash");
const jwt = require("jsonwebtoken");
const uuid_1 = require("uuid");
class AppFunction {
    static isInt(n) {
        n = parseFloat(n);
        return Number(n) === n && n % 1 !== 0;
    }
    static isFloat(n) {
        n = parseFloat(n);
        return Number(n) === n && n % 1 !== 0;
    }
    static isString(s) {
        if (s.length === 0)
            return false;
        return typeof s === "string" || s instanceof String;
    }
    static contentType(req) {
        const contentType = req.get("Content-Type");
        if (contentType === "application/json" || contentType === "application/json; charset=utf-8") {
            return "json";
        }
        else {
            return "others";
        }
    }
    static trimAndLowercase(str) {
        return str.toLowerCase().trim();
    }
    static encryptPassword(str) {
        return password_hash.generate(str);
    }
    static passwordVerify(pw, db_pw) {
        return password_hash.verify(pw, db_pw);
    }
    static jwtVerify(jwtToken) {
        return jwt.verify(jwtToken, "HJOGHJOAHG");
    }
    static createJwtToken(username, email) {
        return jwt.sign({ name: username, email }, "HJOGHJOAHG", {});
    }
    static uuid() {
        return (0, uuid_1.v4)();
    }
    static getSignOfNumber(num) {
        return Math.sign(num);
    }
    static convertStringToNumber(num) {
        return Number(num);
    }
    static typeOfVariable(variable) {
        return typeof variable;
    }
}
exports.AppFunction = AppFunction;
