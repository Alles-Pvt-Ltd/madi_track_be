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
const helper_1 = require("./helper");
class UserController {
    constructor() {
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
            const userResponse = yield user_1.User.getUserById(userId);
            if (userResponse.err) {
                return (0, response_1.failureResponse)(userResponse.message, res);
            }
            return (0, response_1.successResponse)(userResponse.data, "User Retrieved Successfully", res);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id, 10);
            const deleteResponse = yield user_1.User.deleteUser(userId);
            if (deleteResponse.err) {
                return (0, response_1.failureResponse)(deleteResponse.message, res);
            }
            return (0, response_1.successResponse)(deleteResponse.data, "User Deleted Successfully", res);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { username, password } = req.body;
            const loginResponse = yield user_1.User.findUserByUsername(username);
            if (loginResponse.err || loginResponse.data.length === 0) {
                return (0, response_1.failureResponse)("Invalid username or password", res);
            }
            const isPasswordValid = yield app_1.AppFunction.passwordVerify(password, loginResponse.data[0].password);
            if (!isPasswordValid) {
                return (0, response_1.failureResponse)("Invalid username or password", res);
            }
            const { role } = loginResponse.data[0];
            if (!Number.isInteger(role)) {
                return (0, response_1.failureResponse)("User role is invalid", res);
            }
            return (0, response_1.successResponse)(helper_1.default.getToken(username, role), "Login successful", res);
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = {
                role: parseInt(req.body.role, 10),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                username: req.body.username,
                email: req.body.email,
                password: yield app_1.AppFunction.encryptPassword(req.body.password),
                createdOn: new Date().toISOString(),
                updatedOn: new Date().toISOString(),
            };
            const registerResponse = yield user_1.User.register(body);
            if (registerResponse.err) {
                return (0, response_1.failureResponse)(registerResponse.message, res);
            }
            return (0, response_1.successResponse)(registerResponse.data, "User registered successfully", res);
        });
    }
}
exports.UserController = UserController;
