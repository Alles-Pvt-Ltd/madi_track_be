"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
    constructor() {
        // login
        this.loginValidation = [
            (0, express_validator_1.check)("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email').optional({ nullable: false }),
            (0, express_validator_1.check)("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
        ];
        // register / add user
        this.registerValidation = [
            (0, express_validator_1.check)("name").notEmpty().withMessage('username is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("email").notEmpty().withMessage('email is required').isEmail().withMessage('Enter valid email'),
            (0, express_validator_1.check)("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5')
        ];
        //   update user
        this.updateUserValidation = [
            // check("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("first_name").isString().withMessage('first_name data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("last_name").isString().withMessage('last_name data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("email").isEmail().withMessage('Enter valid email').optional({ nullable: true }),
            (0, express_validator_1.check)("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number1').isInt().withMessage('data type should be integer').isLength({ min: 9, max: 10 }).withMessage('phone number lenth incorrect').optional({ nullable: true }),
            (0, express_validator_1.check)("roleId").isInt().withMessage('roleId type should integer').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("is_role_deleted").isBoolean().withMessage('is_role_deleted type should boolean').optional({ nullable: true })
        ];
    }
}
exports.Validation = Validation;
