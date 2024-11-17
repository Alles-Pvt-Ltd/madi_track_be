import { check } from "express-validator";

export class Validation {
    public static loginValidation = [
        check("username").notEmpty().withMessage("Username is required"),
        check("password").notEmpty().withMessage("Password is required")
    ];

    public static registerValidation = [
        check("role").isInt().withMessage("Role must be an integer"),
        check("firstname").notEmpty().withMessage("Firstname is required"),
        check("lastname").notEmpty().withMessage("Lastname is required"),
        check("address").notEmpty().withMessage("Address is required"),
        check("username").notEmpty().withMessage("Username is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").notEmpty().withMessage("Password is required")
    ];

    public static updateValidation = [
        check("id").isInt().withMessage("User ID is required and must be an integer"),
        check("role").isInt().withMessage("Role is required and must be an integer"),
        check("firstname").notEmpty().withMessage("First name is required"),
        check("lastname").notEmpty().withMessage("Last name is required"),
        check("address").notEmpty().withMessage("Address is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").notEmpty().withMessage("Password is required"),
        check("updatedBy").isInt().withMessage("UpdatedBy must be an integer")
    ];
}
