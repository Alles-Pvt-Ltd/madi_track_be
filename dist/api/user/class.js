"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
}
exports.Validation = Validation;
Validation.loginValidation = [
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required")
];
Validation.registerValidation = [
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("createdBy").notEmpty().withMessage("CreatedBy is required"),
    (0, express_validator_1.check)("updatedBy").notEmpty().withMessage("UpdatedBy is required")
];
