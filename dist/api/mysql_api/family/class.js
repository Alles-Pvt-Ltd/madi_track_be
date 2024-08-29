"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
}
exports.Validation = Validation;
Validation.addFamilyValidation = [
    (0, express_validator_1.check)("cardNumber").notEmpty().withMessage("CardNumber is required"),
    (0, express_validator_1.check)("familyName").notEmpty().withMessage("FamilyName is required"),
    (0, express_validator_1.check)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.check)("phone").notEmpty().withMessage("Phone is required"),
    (0, express_validator_1.check)("nicNo").notEmpty().withMessage("NIC number is required"),
    (0, express_validator_1.check)("gsDivisionId").notEmpty().withMessage("Gs division is required"),
];
Validation.addMemberValidation = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Lastname is required"),
    (0, express_validator_1.check)("mobile").notEmpty().withMessage("Mobile is required"),
    (0, express_validator_1.check)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.check)("gender").notEmpty().withMessage("Gender is required"),
    (0, express_validator_1.check)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.check)("dateOfBirth").notEmpty().withMessage("Date Of Birth is required"),
    (0, express_validator_1.check)("nicNo").notEmpty().withMessage("NIC number is required"),
    (0, express_validator_1.check)("occupation").notEmpty().withMessage("Occupation is required"),
    (0, express_validator_1.check)("familyId").notEmpty().withMessage("Family Id is required")
];
Validation.updateMemberValidation = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Lastname is required"),
    (0, express_validator_1.check)("mobile").notEmpty().withMessage("Mobile is required"),
    (0, express_validator_1.check)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.check)("gender").notEmpty().withMessage("Gender is required"),
    (0, express_validator_1.check)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.check)("dateOfBirth").notEmpty().withMessage("Date Of Birth is required"),
    (0, express_validator_1.check)("nicNo").notEmpty().withMessage("NIC number is required"),
    (0, express_validator_1.check)("occupation").notEmpty().withMessage("Occupation is required"),
    (0, express_validator_1.check)("isGovernmentEmployee").notEmpty().withMessage("Government Employee detail is required")
];
Validation.familyHistoryValidation = [
    (0, express_validator_1.check)("date").notEmpty().withMessage("Date is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.check)("organization").notEmpty().withMessage("Organization is required"),
    (0, express_validator_1.check)("familyId").notEmpty().withMessage("Family Id is required")
];
Validation.updateFamilyValidation = [
    (0, express_validator_1.check)("cardNumber").notEmpty().withMessage("CardNumber is required"),
    (0, express_validator_1.check)("familyName").notEmpty().withMessage("FamilyName is required"),
    (0, express_validator_1.check)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.check)("phone").notEmpty().withMessage("Phone is required"),
    (0, express_validator_1.check)("nicNo").notEmpty().withMessage("NIC number is required")
];
Validation.familyHistoryUpdateValidation = [
    (0, express_validator_1.check)("date").notEmpty().withMessage("Date is required"),
    (0, express_validator_1.check)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.check)("organization").notEmpty().withMessage("Organization is required")
];
