"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
}
exports.Validation = Validation;
Validation.addValidation = [
    (0, express_validator_1.check)("userId").isInt().withMessage("User ID must be an integer"),
    (0, express_validator_1.check)("treatmentDate").notEmpty().withMessage("Treatment date is required"),
    (0, express_validator_1.check)("treatmentType").notEmpty().withMessage("Treatment type is required"),
    (0, express_validator_1.check)("location").notEmpty().withMessage("Location is required"),
];
Validation.updateValidation = [
    (0, express_validator_1.param)("hid").trim().isInt().withMessage("Valid ID is required"),
    (0, express_validator_1.check)("userId").isInt().withMessage("User ID must be an integer"),
    (0, express_validator_1.check)("treatmentDate").notEmpty().withMessage("Treatment date is required").isISO8601().withMessage("Treatment date must be in YYYY-MM-DD format"),
    (0, express_validator_1.check)("treatmentType").notEmpty().withMessage("Treatment type is required"),
    (0, express_validator_1.check)("location").notEmpty().withMessage("Location is required"),
    (0, express_validator_1.check)("reportFileUrl").optional().isString().withMessage("Report file URL must be a valid string"),
];
