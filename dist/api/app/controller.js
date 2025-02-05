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
exports.AppController = void 0;
const app_1 = require("../../database/mysql/app");
const response_1 = require("../../core/response");
const express_validator_1 = require("express-validator");
const { exec } = require("child_process");
class AppController {
    constructor() {
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, response_1.failureResponse)("Validation failed", res);
                }
                const { title, description, img_url } = req.body;
                const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url;
                const addResponse = yield app_1.App.addIntro(title, description, imgUrl);
                if (addResponse.err) {
                    return (0, response_1.failureResponse)(addResponse.message, res);
                }
                return (0, response_1.successResponse)(addResponse.data, "Intro Screen Added Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error adding intro: " + error.message, res);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sid = parseInt(req.params.sid, 10);
                if (isNaN(sid)) {
                    return (0, response_1.failureResponse)("Invalid userId provided", res);
                }
                const introResponse = yield app_1.App.getIntroById(sid);
                if (introResponse.err) {
                    return (0, response_1.failureResponse)(introResponse.message, res);
                }
                if (!introResponse.data || !introResponse.data[0]) {
                    res.status(404).json({
                        code: 404,
                        status: false,
                        message: 'Intro does not exist',
                    });
                }
                const userMessage = (_a = introResponse.data[0]) === null || _a === void 0 ? void 0 : _a.message;
                if (userMessage) {
                    const messageLowerCase = userMessage.toLowerCase();
                    if (messageLowerCase === "Intro does not exist") {
                        res.status(404).json({
                            code: 404,
                            status: false,
                            message: 'Intro does not exist',
                        });
                    }
                    if (messageLowerCase === "Intro is deleted") {
                        res.status(200).json({
                            code: 200,
                            status: false,
                            message: 'Intro is deleted',
                        });
                    }
                }
                if (introResponse.data[0]) {
                    res.status(200).json({
                        code: 200,
                        status: true,
                        message: 'Intro Retrieved Successfully',
                        data: introResponse.data[0],
                    });
                }
                res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'No data available for the user.',
                });
            }
            catch (error) {
                return (0, response_1.failureResponse)("An unexpected error occurred", res);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d, _e, _f, _g;
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: 'Validation errors'
                    });
                }
                const sid = parseInt(req.params.sid, 10);
                if (isNaN(sid)) {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: 'Invalid sid provided',
                    });
                }
                const { title, description, img_url, updatedBy } = req.body;
                const updatedByValue = updatedBy === "admin" ? 0 : updatedBy === "user" ? 1 : null;
                if (updatedByValue === null) {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: "Invalid 'updatedBy' value. Use 'admin' or 'user'.",
                    });
                }
                const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url;
                const updateResponse = yield app_1.App.updateIntro(sid, title, description, imgUrl, updatedByValue);
                if (((_c = (_b = updateResponse.data) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === "Intro does not exist") {
                    res.status(404).json({
                        code: 404,
                        status: false,
                        message: 'Intro does not exist',
                    });
                }
                if (((_e = (_d = updateResponse.data) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) === "record is deleted") {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: 'Cannot update a record that is marked as deleted',
                    });
                }
                if (((_g = (_f = updateResponse.data) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.message) === "Intro updated successfully") {
                    res.status(200).json({
                        code: 200,
                        status: true,
                        message: 'Intro updated successfully',
                    });
                }
                res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'An unexpected error occurred',
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'An unexpected error occurred',
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sid = parseInt(req.params.sid, 10);
                if (isNaN(sid)) {
                    res.status(400).json({
                        code: 400,
                        status: false,
                        message: 'Invalid userId provided',
                    });
                }
                const userResponse = yield app_1.App.getIntroById(sid);
                if (userResponse.err) {
                    res.status(500).json({
                        code: 500,
                        status: false,
                        message: userResponse.message,
                    });
                }
                const user = userResponse.data[0];
                if (!user || user.message === "Intro does not exist") {
                    res.status(404).json({
                        code: 404,
                        status: false,
                        message: 'Intro does not exist',
                    });
                }
                if (user.message === "Intro is deleted") {
                    res.status(200).json({
                        code: 200,
                        status: false,
                        message: 'Intro is already deleted',
                    });
                }
                const deleteResponse = yield app_1.App.deleteIntro(sid);
                if (deleteResponse.err) {
                    res.status(500).json({
                        code: 500,
                        status: false,
                        message: deleteResponse.message,
                    });
                }
                res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'User deleted successfully',
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    status: false,
                    message: 'An unexpected error occurred',
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const getAllResponse = yield app_1.App.getAllIntro();
            if (getAllResponse.err) {
                return (0, response_1.failureResponse)(getAllResponse.message, res);
            }
            return (0, response_1.successResponse)(getAllResponse.data, "All Intro Screens Retrieved Successfully", res);
        });
        this.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const documentFile = req.file;
                if (!documentFile) {
                    return (0, response_1.failureResponse)("No file provided.", res);
                }
                return (0, response_1.successResponse)({ imageUrl: "/" + documentFile.path }, "Image uploaded successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Unexpected server error during file upload.", res);
            }
        });
    }
}
exports.AppController = AppController;
