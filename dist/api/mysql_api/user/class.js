"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
}
exports.Validation = Validation;
Validation.loginValidation = [
    (0, express_validator_1.check)("userName").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required")
];
Validation.registerValidation = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Lastname is required"),
    (0, express_validator_1.check)("userName").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.check)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.check)("gsDivisionId").notEmpty().withMessage("Gs division is required")
];
