import { check } from "express-validator";

export class AppValidation {
    public static addValidation = [
        check("title").notEmpty().withMessage("Title is required"),
        check("description").notEmpty().withMessage("Description is required"),
        check("img_url").notEmpty().withMessage("Image URL is required")
    ];

    public static updateValidation = [
        check("sid").isInt().withMessage("Valid ID is required"),
        check("title").notEmpty().withMessage("Title is required"),
        check("description").notEmpty().withMessage("Description is required"),
        check("img_url").notEmpty().withMessage("Image URL is required")
    ];
}
