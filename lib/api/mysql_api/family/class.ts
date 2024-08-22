import { check } from "express-validator";

export class Validation {

  public static addFamilyValidation = [
    check("cardNumber").notEmpty().withMessage("CardNumber is required"),
    check("familyName").notEmpty().withMessage("FamilyName is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("phone").notEmpty().withMessage("Phone is required"),
    check("nicNo").notEmpty().withMessage("NIC number is required"),
    check("gsDivisionId").notEmpty().withMessage("Gs division is required"),
  ];
}
