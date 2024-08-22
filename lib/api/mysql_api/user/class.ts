import { check } from "express-validator";

export class Validation {

  public static loginValidation = [
    check("userName").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required")
  ];

  public static registerValidation = [
    check("firstName").notEmpty().withMessage("Firstname is required"),
    check("lastName").notEmpty().withMessage("Lastname is required"),
    check("userName").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("role").notEmpty().withMessage("Role is required"),
    check("gsDivisionId").notEmpty().withMessage("Gs division is required")
  ];
}
