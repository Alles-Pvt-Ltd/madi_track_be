"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppValidation = void 0;
const express_validator_1 = require("express-validator");
class AppValidation {
}
exports.AppValidation = AppValidation;
AppValidation.addValidation = [
    (0, express_validator_1.check)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.check)("img_url").notEmpty().withMessage("Image URL is required")
];
AppValidation.updateValidation = [
    (0, express_validator_1.check)("sid").isInt().withMessage("Valid ID is required"),
    (0, express_validator_1.check)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.check)("img_url").notEmpty().withMessage("Image URL is required")
];
