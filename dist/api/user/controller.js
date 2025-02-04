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
const helper_1 = require("./helper");
class UserController {
    // Login API
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            try {
                const loginResponse = yield user_1.User.findUserByUsername(req.body.username, req.body.email);
                if (loginResponse.err) {
                    return (0, response_1.failureResponse)(loginResponse.message, res);
                }
                const user = loginResponse.data;
                if (!user || Object.keys(user).length === 0) {
                    return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
                }
                const isPasswordValid = yield helper_1.default.verifyPassword(req.body.password, user.password);
                if (!isPasswordValid) {
                    return (0, response_1.failureResponse)("Invalid password", res);
                }
                const token = app_1.AppFunction.createJwtToken(user.username, user.id, user.email);
                return (0, response_1.successResponse)(token, "Login successful", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Internal server error: " + error.message, res);
            }
        });
    }
    // Register API
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { username, email, role, firstname, lastname, address, password, parentId, createdBy } = req.body;
            if (parentId) {
                const parentExists = yield user_1.User.findUserById(parentId);
                if (!parentExists) {
                    return (0, response_1.failureResponse)("Invalid parentId. Parent user does not exist.", res);
                }
            }
            const existingUserResponse = yield user_1.User.findUserByUsername(username, email);
            if (!existingUserResponse.err) {
                return (0, response_1.failureResponse)("Username or email is already in use.", res);
            }
            const encryptedPassword = yield app_1.AppFunction.encryptPassword(password);
            const user = {
                role: parseInt(role, 10),
                firstname,
                lastname,
                address,
                username,
                email,
                password: encryptedPassword,
                createdBy: createdBy || 1,
                updatedBy: createdBy || 1,
                parentId: parentId || null,
                createdOn: new Date().toISOString(),
                updatedOn: new Date().toISOString(),
            };
            const registerResponse = yield user_1.User.register(user);
            if (registerResponse.err) {
                return (0, response_1.failureResponse)(registerResponse.message, res);
            }
            return (0, response_1.successResponse)(registerResponse.data, "User registered successfully", res);
        });
    }
    // Update User API
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { id, role, firstname, lastname, address, email, password, updatedBy, parentId } = req.body;
            const existingUser = yield user_1.User.getUserById(id);
            if (!existingUser) {
                return (0, response_1.failureResponse)("User not found. Please try again.", res);
            }
            if (parentId) {
                const parentExists = yield user_1.User.findUserById(parentId);
                if (!parentExists) {
                    return (0, response_1.failureResponse)("Invalid parentId. Parent user does not exist.", res);
                }
            }
            const updatedUser = {
                role: parseInt(role, 10),
                firstname,
                lastname,
                address,
                username: email,
                email,
                password: yield app_1.AppFunction.encryptPassword(password),
                updatedBy,
                updatedOn: new Date().toISOString(),
            };
            const updateResponse = yield user_1.User.updateUser(id, updatedUser, updatedBy);
            if (updateResponse.err) {
                return (0, response_1.failureResponse)(updateResponse.message, res);
            }
            return (0, response_1.successResponse)(null, "User updated successfully", res);
        });
    }
    // Delete User API
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return (0, response_1.failureResponse)("Invalid user ID provided", res);
            }
            const userResponse = yield user_1.User.getUserById(userId);
            if (userResponse.err || !userResponse.data) {
                return (0, response_1.failureResponse)("User not found", res);
            }
            const deleteResponse = yield user_1.User.deleteUser(userId);
            if (deleteResponse.err) {
                return (0, response_1.failureResponse)(deleteResponse.message, res);
            }
            return (0, response_1.successResponse)(null, "User deleted successfully", res);
        });
    }
    // Get All Users API
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersResponse = yield user_1.User.getAllUsers();
                if (usersResponse.err) {
                    return (0, response_1.failureResponse)(usersResponse.message, res);
                }
                return (0, response_1.successResponse)(usersResponse.data, "Users fetched successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("An unexpected error occurred: " + error.message, res);
            }
        });
    }
    // Get User By ID API
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return (0, response_1.failureResponse)("Invalid user ID provided", res);
                }
                const userResponse = yield user_1.User.getUserById(userId);
                if (userResponse.err || !userResponse.data) {
                    return (0, response_1.failureResponse)("User not found", res);
                }
                return (0, response_1.successResponse)(userResponse.data, "User retrieved successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("An unexpected error occurred: " + error.message, res);
            }
        });
    }
}
exports.UserController = UserController;
