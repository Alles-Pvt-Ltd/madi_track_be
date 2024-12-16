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
class UserController {
    constructor() {
        // Update User
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
            const userData = {
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
            const updateResponse = yield user_1.User.updateUser(id, userData, updatedBy);
            if (updateResponse.err) {
                return (0, response_1.failureResponse)(updateResponse.message, res);
            }
            return (0, response_1.successResponse)(updateResponse.data, 'User updated successfully', res);
        });
        // Get User by ID
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
        // Delete User
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
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, errors: errors.array() });
                return;
            }
            try {
                const { username, email, password } = req.body;
                // Check if user exists
                const userResponse = yield user_1.User.findUserByUsername(username, email);
                if (!userResponse || !userResponse.data) {
                    res.status(404).json({ success: false, message: "User not found" });
                    return;
                }
                const user = userResponse.data;
                // Verify password
                const isPasswordValid = yield app_1.AppFunction.passwordVerify(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ success: false, message: "Invalid password" });
                    return;
                }
                // Generate JWT token
                const token = app_1.AppFunction.createJwtToken(user.username, user.id, user.email);
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token: token,
                });
            }
            catch (error) {
                console.error("Login error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        });
    }
    // Register User
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({ success: false, errors: errors.array() });
                }
                const { username, email, role, firstname, lastname, address, password, createdBy } = req.body;
                // Validate createdBy field
                if (createdBy !== 1 && createdBy !== 2) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid createdBy value. Only 1 or 2 are allowed."
                    });
                }
                // Check if user already exists
                const existingUserResponse = yield user_1.User.findUserByUsername(username, email);
                if (existingUserResponse.data) {
                    res.status(400).json({
                        success: false,
                        message: "Username or email is already in use."
                    });
                }
                // Create the user object
                const body = {
                    role: parseInt(role, 10),
                    firstname,
                    lastname,
                    address,
                    username,
                    email,
                    password: yield app_1.AppFunction.encryptPassword(password),
                    createdOn: new Date().toISOString(),
                    updatedOn: new Date().toISOString(),
                    createdBy,
                };
                // Register the user
                const registerResponse = yield user_1.User.register(body);
                if (registerResponse.err) {
                    res.status(500).json({
                        success: false,
                        message: registerResponse.message
                    });
                }
                // Successfully registered
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                    data: registerResponse.data
                });
            }
            catch (error) {
                console.error("Error in registration:", error);
                res.status(500).json({
                    success: false,
                    message: "Internal server error. Please try again later."
                });
            }
        });
    }
    // Get All Users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsersResponse = yield user_1.User.getAllUsers();
            if (allUsersResponse.err) {
                return (0, response_1.failureResponse)(allUsersResponse.message, res);
            }
            return (0, response_1.successResponse)(allUsersResponse.data, 'All Users Got Successfully', res);
        });
    }
}
exports.UserController = UserController;
