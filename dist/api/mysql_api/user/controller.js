"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../../../database/mysql/user");
const response_1 = require("../../../core/response");
const app_1 = require("../../../core/app");
const helper_1 = require("./helper");
const constant_1 = require("../../../config/constant");
const express_validator_1 = require("express-validator");
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const loginResponse = yield user_1.User.findUserByUsername(req.body.userName);
            if (loginResponse.err) {
                return (0, response_1.failureResponse)(loginResponse.message, res);
            }
            if (!app_1.AppFunction.passwordVerify(req.body.password, loginResponse.data[0].password)) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            return (0, response_1.successResponse)(helper_1.default.loginResponse(loginResponse.data[0]), "Login successfull", res);
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = req.body;
            const user = yield user_1.User.findUserByUsername(body.userName);
            if (user.err) {
                return (0, response_1.failureResponse)(user.message, res);
            }
            if (user.data.length > 0) {
                return (0, response_1.failureResponse)("User already exist", res);
            }
            body.code = app_1.AppFunction.uuid();
            body.password = app_1.AppFunction.encryptPassword(body.password);
            const register = yield user_1.User.register(body);
            if (register.err) {
                return (0, response_1.failureResponse)(register.message, res);
            }
            return (0, response_1.successResponse)(register.data, "User Registered Successfully", res);
        });
        this.reference = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const responseData = yield user_1.User.reference();
            const referenceData = {
                genderReference: responseData.data[0],
                familyRoleReference: responseData.data[1]
            };
            return (0, response_1.successResponse)(referenceData, "Successfully retrieved", res);
        });
    }
}
exports.UserController = UserController;
