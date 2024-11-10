import { check } from "express-validator";

export class Validation {
  public static loginValidation = [
      check("username").notEmpty().withMessage("Username is required"),
      check("password").notEmpty().withMessage("Password is required")
  ];

  public static registerValidation = [
      check("username").notEmpty().withMessage("Username is required"),
      check("email").isEmail().withMessage("Valid email is required"),
      check("password").notEmpty().withMessage("Password is required"),
      check("createdBy").notEmpty().withMessage("CreatedBy is required"),
      check("updatedBy").notEmpty().withMessage("UpdatedBy is required")
  ];
}
