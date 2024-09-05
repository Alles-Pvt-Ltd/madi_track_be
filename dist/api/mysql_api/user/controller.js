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
const jwt_1 = require("../../../core/jwt");
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
            if (loginResponse.data.length === 0) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            if (!app_1.AppFunction.passwordVerify(req.body.password, loginResponse.data[0][0].password)) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            return (0, response_1.successResponse)(helper_1.default.getToken(loginResponse.data[0][0].code, loginResponse.data[0][0].role), "Login successfull", res);
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
            if (user.data[0].length > 0) {
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
                familyRoleReference: responseData.data[1],
                occupationReference: responseData.data[2],
                gsDivisions: responseData.data[3]
            };
            return (0, response_1.successResponse)(referenceData, "Successfully retrieved", res);
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            if (!app_1.AppFunction.passwordVerify(req.body.oldPassword, userInfo.data[0].password)) {
                return (0, response_1.failureResponse)("Password not match", res);
            }
            const changedPassword = yield user_1.User.changePassword(jwtData.code, app_1.AppFunction.encryptPassword(req.body.newPassword));
            if (changedPassword.err) {
                return (0, response_1.failureResponse)(changedPassword.message, res);
            }
            return (0, response_1.successResponse)(changedPassword.data, changedPassword.message, res);
        });
        this.userInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            const userDetail = yield user_1.User.userInfo(userInfo.data[0].id);
            if (userDetail.err) {
                return (0, response_1.failureResponse)("Error Occur, UserDetails Not Found", res);
            }
            return (0, response_1.successResponse)(helper_1.default.userResponse(userDetail.data), userDetail.message, res);
        });
    }
}
exports.UserController = UserController;
