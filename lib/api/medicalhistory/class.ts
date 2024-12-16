import { check, param } from "express-validator";

export class Validation {
  public static addValidation = [
    check("userId").isInt().withMessage("User ID must be an integer"),
    check("treatmentDate").notEmpty().withMessage("Treatment date is required"),
    check("treatmentType").notEmpty().withMessage("Treatment type is required"),
    check("location").notEmpty().withMessage("Location is required"),
  ];

  public static updateValidation = [
    param("hid").trim().isInt().withMessage("Valid ID is required"), 
    check("userId").isInt().withMessage("User ID must be an integer"),
    check("treatmentDate").notEmpty().withMessage("Treatment date is required").isISO8601().withMessage("Treatment date must be in YYYY-MM-DD format"),
    check("treatmentType").notEmpty().withMessage("Treatment type is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("reportFileUrl").optional().isString().withMessage("Report file URL must be a valid string"),
  ];
}
