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
        // Get User by ID API
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userId = parseInt(req.params.id, 10);
                // Validate user ID
                if (isNaN(userId)) {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: "Invalid user ID provided",
                    });
                }
                // Fetch user data by ID
                const userResponse = yield user_1.User.getUserById(userId);
                // Handle errors from the database query
                if (userResponse.err) {
                    res.status(500).json({
                        code: 500,
                        status: false,
                        message: userResponse.message || "Internal server error",
                    });
                }
                // Handle specific responses from the database
                const userMessage = (_b = (_a = userResponse.data[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                if (userMessage === "user does not exist or is deleted") {
                    res.status(404).json({
                        code: 404,
                        status: false,
                        message: "User not found or deleted",
                    });
                }
                if (userMessage === "user exists but is marked as deleted") {
                    res.status(200).json({
                        code: 200,
                        status: false,
                        message: "User is deleted",
                    });
                }
                // Check if user data exists and return it
                if (userResponse.data[0]) {
                    res.status(200).json({
                        code: 200,
                        status: true,
                        message: "User retrieved successfully",
                        data: userResponse.data[0],
                    });
                }
                // Fallback for unexpected cases
                res.status(404).json({
                    code: 404,
                    status: false,
                    message: "No data available for the user",
                });
            }
            catch (error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    status: false,
                    message: "An unexpected error occurred: " + error.message,
                });
            }
        });
    }
    // Login API
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!helper_1.default.validateRequest(req, res))
                return;
            try {
                const { username, email, password } = req.body;
                const userResponse = yield user_1.User.findUserByUsername(username, email);
                if (!userResponse || userResponse.err || !userResponse.data) {
                    res.status(404).json({ success: false, message: 'User not found' });
                    return;
                }
                const user = userResponse.data;
                const isPasswordValid = yield helper_1.default.verifyPassword(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ success: false, message: 'Invalid password' });
                    return;
                }
                const token = helper_1.default.generateJwtToken(user.username, user.id, user.email);
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token,
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
            }
        });
    }
    // Register API
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
                return;
            }
            try {
                const { username, email, role, firstname, lastname, address, password, createdBy, parentId, updatedBy } = req.body;
                if (!parentId) {
                    res.status(400).json({ success: false, message: 'parentId is required.' });
                    return;
                }
                if (![1, 2].includes(createdBy)) {
                    res.status(400).json({ success: false, message: 'Invalid createdBy value. Only 1 or 2 are allowed.' });
                    return;
                }
                const parentUserCheck = yield user_1.User.findUserById(parentId); // Check if parentId exists
                console.log('Parent User Check:', parentUserCheck);
                if (parentUserCheck.err || !parentUserCheck.data || parentUserCheck.data.isDeleted) {
                    res.status(400).json({ success: false, message: 'Invalid parentId. Parent user does not exist or is deleted.' });
                    return;
                }
                const existingUserResponse = yield user_1.User.findUserByUsername(username, email);
                if (existingUserResponse && !existingUserResponse.err && existingUserResponse.data) {
                    res.status(400).json({ success: false, message: 'Username or email is already in use.' });
                    return;
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
                    parentId,
                    updatedBy: updatedBy || 1,
                };
                const registerResponse = yield user_1.User.register(user);
                if (registerResponse.err) {
                    res.status(500).json({ success: false, message: registerResponse.message });
                    return;
                }
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    data: registerResponse.data,
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
            }
        });
    }
    // Update User API
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!helper_1.default.validateRequest(req, res))
                return;
            const { id, role, firstname, lastname, address, email, password, parentId, updatedBy, username } = req.body;
            if (![1, 2].includes(updatedBy)) {
                return (0, response_1.badResponse)([{ msg: 'Invalid updatedBy value. Only 1 or 2 are allowed.' }], res);
            }
            if (id === parentId) {
                return (0, response_1.badResponse)([{ msg: 'User and parent cannot be the same.' }], res);
            }
            const encryptedPassword = password ? yield app_1.AppFunction.encryptPassword(password) : null;
            const userData = {
                role,
                firstname,
                lastname,
                address,
                username,
                email,
                password: encryptedPassword,
                parentId: parentId,
                updatedBy,
                updatedOn: new Date().toISOString(),
            };
            const updateResponse = yield user_1.User.updateUser(id, userData, updatedBy);
            if (updateResponse.err) {
                return (0, response_1.failureResponse)(updateResponse.message, res);
            }
            return (0, response_1.successResponse)(updateResponse.data, 'User updated successfully', res);
        });
    }
    // Get All Users API
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsersResponse = yield user_1.User.getAllUsers();
            if (allUsersResponse.err) {
                return (0, response_1.failureResponse)(allUsersResponse.message, res);
            }
            return (0, response_1.successResponse)(allUsersResponse.data, 'All Users Got Successfully', res);
        });
    }
    // Delete User API
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return (0, response_1.badResponse)([{ msg: 'Invalid user ID.' }], res);
                }
                const deleteResponse = yield user_1.User.deleteUser(userId);
                if (deleteResponse.err) {
                    return (0, response_1.failureResponse)(deleteResponse.message, res);
                }
                return (0, response_1.successResponse)(deleteResponse, 'User and related child users deleted successfully.', res);
            }
            catch (error) {
                return (0, response_1.failureResponse)('Internal server error.', res);
            }
        });
    }
}
exports.UserController = UserController;
