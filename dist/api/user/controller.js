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
        // Update User API
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const { id, role, firstname, lastname, address, email, password, updatedBy } = req.body;
            if (![1, 2].includes(updatedBy)) {
                return (0, response_1.badResponse)([{ msg: 'Invalid updatedBy Value.Only 1 or 2 are allowed.' }], res);
            }
            const existingUser = yield user_1.User.getUserById(id);
            if (!existingUser) {
                return (0, response_1.badResponse)([{ msg: 'User not found.please try Again.' }], res);
            }
            const user = {
                role,
                firstname,
                lastname,
                address,
                username: email,
                email,
                password: yield app_1.AppFunction.encryptPassword(password),
                createdOn: '',
                updatedOn: new Date().toISOString(),
                createdBy: updatedBy
            };
            const updateResponse = yield user_1.User.updateUser(id, user, updatedBy);
            if (updateResponse.err) {
                return (0, response_1.failureResponse)(updateResponse.message, res);
            }
            return (0, response_1.successResponse)(updateResponse.data, 'User updated successfully', res);
        });
        // Delete User API
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return (0, response_1.failureResponse)("Invalid user ID provided", res);
                }
                const userResponse = yield user_1.User.getUserById(userId);
                if (userResponse.err) {
                    return (0, response_1.failureResponse)(userResponse.message, res);
                }
                if (userResponse.data && userResponse.data[0].message === "User does not exist") {
                    return res.status(404).json({
                        code: 404,
                        status: false,
                        message: 'Invalid Id ',
                    });
                }
                const user = userResponse.data[0];
                if (user && user.message === "User is deleted") {
                    return res.status(200).json({
                        code: 200,
                        status: false,
                        message: 'Already deleted the user',
                    });
                }
                const deleteResponse = yield user_1.User.deleteUser(userId);
                if (deleteResponse.err) {
                    return (0, response_1.failureResponse)(deleteResponse.message, res);
                }
                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'User Deleted Successfully',
                });
            }
            catch (error) {
                return (0, response_1.failureResponse)("An unexpected error occurred", res);
            }
        });
        // Get User By ID API
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return (0, response_1.failureResponse)("Invalid user ID provided", res);
                }
                const userResponse = yield user_1.User.getUserById(userId);
                if (userResponse.err) {
                    return (0, response_1.failureResponse)(userResponse.message, res);
                }
                if (!userResponse.data || ((_a = userResponse.data[0]) === null || _a === void 0 ? void 0 : _a.message) === "User does not exist") {
                    return res.status(404).json({
                        code: 404,
                        status: false,
                        message: 'Invalid Id',
                    });
                }
                if ((((_b = userResponse.data[0]) === null || _b === void 0 ? void 0 : _b.message) || "").toLowerCase() === "user is deleted") {
                    return res.status(200).json({
                        code: 200,
                        status: false,
                        message: 'User is deleted',
                    });
                }
                if (userResponse.data[0]) {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        message: 'User Retrieved Successfully',
                        data: userResponse.data[0]
                    });
                }
                return res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'No data available for the user.',
                });
            }
            catch (error) {
                return (0, response_1.failureResponse)("An unexpected error occurred", res);
            }
        });
    }
    // Login API
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            try {
                const { username, email, password } = req.body;
                const loginResponse = yield user_1.User.findUserByUsername(req.body.username, req.body.email);
                if (loginResponse.err) {
                    return (0, response_1.failureResponse)(loginResponse.message, res);
                }
                const user = loginResponse.data;
                if (loginResponse.data.length === 0) {
                    return (0, response_1.failureResponse)(constant_1.StringConstant.usernamePasswordMismatch, res);
                }
                const token = app_1.AppFunction.createJwtToken(user.username, user.id, user.email);
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token: token,
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Internal server error", error: error.message });
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
            const { username, email, role, firstname, lastname, address, password, createdBy, parentId } = req.body;
            if (createdBy !== 1 && createdBy !== 2) {
                return (0, response_1.badResponse)([{ message: "Invalid createdBy value. Only 1 (Admin) or 2 (User) are allowed." }], res);
            }
            if (parentId) {
                const parentExists = yield user_1.User.findUserById(parentId);
                if (!parentExists) {
                    return (0, response_1.badResponse)([{ message: "Invalid parentId. Parent user does not exist." }], res);
                }
            }
            const existingUserResponse = yield user_1.User.findUserByUsername(username, email);
            if (existingUserResponse.err != true) {
                return (0, response_1.badResponse)([{ message: "Username or email is already in use." }], res);
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
                createdOn: new Date().toISOString(),
                updatedOn: new Date().toISOString(),
                createdBy,
                parentId: parentId || null,
            };
            const registerResponse = yield user_1.User.register(user);
            if (registerResponse.err) {
                return (0, response_1.failureResponse)(registerResponse.message, res);
            }
            return (0, response_1.successResponse)(registerResponse.data, 'user registered sucessfully', res);
        });
    }
    // Get All Users API
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersResponse = yield user_1.User.getAllUsers();
                if (usersResponse.err) {
                    res.status(500).json({ success: false, message: usersResponse.message });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: 'Users fetched successfully',
                    data: usersResponse.data,
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
