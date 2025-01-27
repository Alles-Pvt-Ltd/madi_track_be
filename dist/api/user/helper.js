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
const crypto = require("crypto");
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
    static verifyPassword(inputPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2a$')) {
                    return yield bcrypt_1.default.compare(inputPassword, storedPassword);
                }
                if (storedPassword.startsWith('sha1$')) {
                    const parts = storedPassword.split('$');
                    if (parts.length >= 3) {
                        const [prefix, salt, ...hashParts] = parts;
                        const hash = hashParts.join('$');
                        const sha1Hash = crypto.createHash('sha1').update(salt + inputPassword).digest('hex');
                        return sha1Hash === hash;
                    }
                }
                console.error('Unsupported password format');
                return false;
            }
            catch (err) {
                console.error('Error in password verification:', err);
                return false;
            }
        });
    }
    static encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return bcrypt_1.default.hash(password, saltRounds);
        });
    }
    static generateJwtToken(username, userId, email) {
        return jsonwebtoken_1.default.sign({ username, userId, email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    }
    /**
     * Generates a unique family ID using a random string.
     */
    static generateUniqueFamilyId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const familyId = crypto.randomBytes(8).toString('hex'); // Generate a random 16-character hex string
                return familyId;
            }
            catch (error) {
                console.error('Error generating unique family ID:', error);
                throw new Error('Failed to generate unique family ID');
            }
        });
    }
}
exports.default = Helper;
