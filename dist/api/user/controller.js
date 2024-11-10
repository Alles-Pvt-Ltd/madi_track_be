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
const user_1 = require("../../database/mysql/user");
const response_1 = require("../../core/response");
const app_1 = require("../../core/app");
const helper_1 = require("./helper");
const constant_1 = require("../../config/constant");
const express_validator_1 = require("express-validator");
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { username, password } = req.body;
            const loginResponse = yield user_1.User.findUserByUsername(username);
            if (loginResponse.err || loginResponse.data.length === 0) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            const user = loginResponse.data[0];
            if (!app_1.AppFunction.passwordVerify(password, user.password)) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            // Generate and return JWT token
            const token = helper_1.default.getToken(user.username, user.id);
            return (0, response_1.successResponse)({ token }, "Login successful", res);
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = req.body;
            if (body.password === '') {
                return (0, response_1.failureResponse)("Password cannot be empty!", res);
            }
            const user = yield user_1.User.findUserByUsername(body.username);
            if (!body.id && user.data.length > 0) {
                return (0, response_1.failureResponse)("User already exists", res);
            }
            body.id = body.id || 0;
            body.password = app_1.AppFunction.encryptPassword(body.password);
            const registerResponse = yield user_1.User.register(body);
            if (registerResponse.err) {
                return (0, response_1.failureResponse)(registerResponse.message, res);
            }
            return (0, response_1.successResponse)(registerResponse.data, "User registered successfully", res);
        });
    }
}
exports.UserController = UserController;
