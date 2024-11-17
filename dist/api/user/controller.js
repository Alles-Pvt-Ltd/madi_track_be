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
const express_validator_1 = require("express-validator");
const constant_1 = require("../../config/constant");
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
            if (!app_1.AppFunction.passwordVerify(req.body.password, loginResponse.data[0].password)) {
                return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
            }
            return (0, response_1.successResponse)(loginResponse.data[0], "Login successful", res);
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = {
                role: parseInt(req.body.role, 10) || 0,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                address: req.body.address,
                username: req.body.username,
                email: req.body.email,
                password: app_1.AppFunction.encryptPassword(req.body.password),
                createdOn: new Date().toISOString(),
                updatedOn: new Date().toISOString()
            };
            const registerResponse = yield user_1.User.register(body);
            if (registerResponse.err) {
                return (0, response_1.failureResponse)(registerResponse.message, res);
            }
            return (0, response_1.successResponse)(registerResponse.data, "User Registered Successfully", res);
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { id, role, firstname, lastname, address, email, password, updatedBy } = req.body;
            const userData = {
                role,
                firstName: firstname,
                lastName: lastname,
                address,
                username: email,
                email,
                password: app_1.AppFunction.encryptPassword(password),
                createdOn: "",
                updatedOn: new Date().toISOString()
            };
            const updateResponse = yield user_1.User.updateUser(id, userData, updatedBy);
            if (updateResponse.err) {
                return (0, response_1.failureResponse)(updateResponse.message, res);
            }
            return (0, response_1.successResponse)(updateResponse.data, "User Updated Successfully", res);
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUsersResponse = yield user_1.User.getAllUsers();
            if (allUsersResponse.err) {
                return (0, response_1.failureResponse)(allUsersResponse.message, res);
            }
            return (0, response_1.successResponse)(allUsersResponse.data, "All Users Retrieved Successfully", res);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return (0, response_1.badResponse)([{ msg: "Invalid user ID" }], res);
            }
            const userResponse = yield user_1.User.getUserById(userId);
            if (userResponse.err) {
                return (0, response_1.failureResponse)(userResponse.message, res);
            }
            return (0, response_1.successResponse)(userResponse.data, "User Retrieved Successfully", res);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = parseInt(req.params.id, 10);
            const token = (_a = req.headers.token) === null || _a === void 0 ? void 0 : _a.toString();
            if (!token) {
                return (0, response_1.badResponse)([{ msg: "No token provided" }], res);
            }
            let decoded;
            try {
                decoded = app_1.AppFunction.jwtVerify(token); // Use AppFunction.jwtVerify() here
            }
            catch (error) {
                return (0, response_1.badResponse)([{ msg: "Invalid token" }], res);
            }
            const deleteResponse = yield user_1.User.deleteUser(userId);
            if (deleteResponse.err) {
                return (0, response_1.failureResponse)(deleteResponse.message, res);
            }
            return (0, response_1.successResponse)(deleteResponse.data, "User Deleted Successfully", res);
        });
    }
}
exports.UserController = UserController;
