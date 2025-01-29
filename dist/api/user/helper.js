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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
class Helper {
    static validateRequest(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return false;
        }
        return true;
    }
    // Send a failure response
    static failureResponse(message, res) {
        res.status(500).json({ success: false, message });
    }
    // Encrypt password using bcrypt
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                return yield bcrypt_1.default.hash(password, saltRounds);
            }
            catch (err) {
                console.error('Error in encryptPassword:', err);
                throw err;
            }
        });
    }
    // Verify password using bcrypt
    static verifyPassword(inputPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(inputPassword, storedPassword);
            }
            catch (err) {
                console.error('Error in verifyPassword:', err);
                return false;
            }
        });
    }
    // Generate JWT token
    static generateJwtToken(username, userId, email) {
        return jsonwebtoken_1.default.sign({ username, userId, email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    }
}
exports.default = Helper;
