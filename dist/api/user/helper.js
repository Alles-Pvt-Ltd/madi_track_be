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
const app_1 = require("../../core/app");
const express_validator_1 = require("express-validator");
class Helper {
    // Static method to handle validation errors
    static validateRequest(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return false;
        }
        return true;
    }
    // Static method to verify user password
    static verifyPassword(inputPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.AppFunction.passwordVerify(inputPassword, storedPassword);
        });
    }
    // Static method to generate JWT token
    static generateJwtToken(username, userId, email) {
        return app_1.AppFunction.createJwtToken(username, userId, email);
    }
}
exports.default = Helper;
