"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
class Validation {
    constructor() {
        // login
        this.loginValidation = [
            (0, express_validator_1.check)("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number1').isInt().withMessage('data type should be integer').isLength({ min: 9, max: 10 }).withMessage('phone number lenth incorrect').optional({ nullable: true }),
            // check("email").isEmail().withMessage('Enter valid email').optional({ nullable: true }),
            (0, express_validator_1.check)("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
        ];
        // register / add user
        this.registerValidation = [
            // check("name").notEmpty().withMessage('username is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
            (0, express_validator_1.check)("first_name").notEmpty().withMessage('first_name is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("last_name").notEmpty().withMessage('last_name is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("email").notEmpty().withMessage('email is required').isEmail().withMessage('Enter valid email'),
            (0, express_validator_1.check)("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number').notEmpty().withMessage('mobile number is required').isInt().withMessage('data type should be integer').isLength({ min: 9, max: 10 }).withMessage('phonew number lenth incorrect'),
            // check("roleId").notEmpty().withMessage('roleId is required').isInt().withMessage('type should integer'),
            // checkBody('partnerid', 'Partnerid field must be 5 character long ').
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
        // register / add role
        this.addRoleValidation = [
            (0, express_validator_1.check)("name").notEmpty().withMessage('role is required').isString().withMessage('data type should be string'),
        ];
        //   update role
        this.updateRoleValidation = [
            (0, express_validator_1.check)("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
        ];
        // register / add ezlanka_provider
        this.addEz_lanka_providerValidation = [
            (0, express_validator_1.check)("name").notEmpty().withMessage('provider name is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("op_code").notEmpty().withMessage('op_code is required').isString().withMessage('data type should be string'),
        ];
        //   update ezlanka_provider
        this.updateEz_lanka_providerValidation = [
            (0, express_validator_1.check)("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("op_code").isString().withMessage('op_code data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
        ];
        // register / add service
        this.addServiceValidation = [
            (0, express_validator_1.check)("name").notEmpty().withMessage('services name is required').isString().withMessage('data type should be string'),
            // check("service_code").notEmpty().withMessage('service_code is required').isString().withMessage('data type should be string'),
        ];
        //   update service
        this.updateServiceValidation = [
            (0, express_validator_1.check)("name").isString().withMessage('services name data type should be string').optional({ nullable: true }),
            // check("service_code").isString().withMessage('service_code data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
        ];
        // register / add service type
        this.addTypeValidation = [
            (0, express_validator_1.check)("name").notEmpty().withMessage('type name is required').isString().withMessage('data type should be string'),
            // check("type_code").notEmpty().withMessage('type_code is required').isString().withMessage('data type should be string'),
        ];
        //   update type type
        this.updateTypeValidation = [
            (0, express_validator_1.check)("name").isString().withMessage('type name data type should be string').optional({ nullable: true }),
            // check("type_code").isString().withMessage('type_code data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
        ];
        // register / add provider
        this.addProviderValidation = [
            (0, express_validator_1.check)("type_code").notEmpty().withMessage('type provider type_code is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("ezlanka_provider_code").notEmpty().withMessage('type provider ezlanka_provider_code is required').isString().withMessage('data type should be string'),
            // check("provider_code").notEmpty().withMessage('provider_code is required').isString().withMessage('data type should be string'),
            (0, express_validator_1.check)("provider_percentage").notEmpty().withMessage('provider_percentage is required').isNumeric().withMessage('data type should be double'),
        ];
        //   update provider
        this.updateProviderValidation = [
            (0, express_validator_1.check)("type_code").isString().withMessage('data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("ezlanka_provider_code").isString().withMessage('data type should be string').optional({ nullable: true }),
            // check("provider_code").isString().withMessage('data type should be string').optional({ nullable: true }),
            (0, express_validator_1.check)("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
            (0, express_validator_1.check)("provider_percentage").isNumeric().withMessage('provider_percentage type should boolean').optional({ nullable: true }),
        ];
        // register / add package
        this.addPackageValidation = [
            // check("provider_code").notEmpty().withMessage('provider code is required').isString().withMessage('data type should string'),
            (0, express_validator_1.check)("package.provider_percentage").notEmpty().withMessage('provider percentage is required').isNumeric().withMessage('data type should be int or double'),
            (0, express_validator_1.check)("package.admin_gave_commission_to_distibutor").notEmpty().withMessage('provider_percentage is required').isNumeric().withMessage('data type should be int or double'),
        ];
    }
}
exports.Validation = Validation;
