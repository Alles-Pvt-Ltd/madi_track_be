"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
}
exports.Validation = Validation;
Validation.loginValidation = [
    (0, express_validator_1.check)('username').not().isEmpty().withMessage('Username is required'),
    (0, express_validator_1.check)('password').not().isEmpty().withMessage('Password is required'),
];
Validation.registerValidation = [
    (0, express_validator_1.check)("role").isInt().withMessage("Role must be an integer"),
    (0, express_validator_1.check)("firstname").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.check)("lastname").notEmpty().withMessage("Lastname is required"),
    (0, express_validator_1.check)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required")
];
Validation.updateValidation = [
    (0, express_validator_1.check)("id").isInt().withMessage("User ID must be an integer"),
    (0, express_validator_1.check)("role").isInt().withMessage("Role must be an integer"),
    (0, express_validator_1.check)("firstname").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.check)("lastname").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.check)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("updatedBy").isInt().withMessage("UpdatedBy must be an integer")
];
