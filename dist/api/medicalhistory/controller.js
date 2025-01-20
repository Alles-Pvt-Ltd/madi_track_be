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
exports.MedicalHistoryController = void 0;
const express_validator_1 = require("express-validator");
const medicalhistory_1 = require("../../database/mysql/medicalhistory");
const jwt_1 = require("../../core/jwt");
const response_1 = require("../../core/response");
class MedicalHistoryController {
    constructor() {
        // Add Medical History
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, response_1.failureResponse)("Validation failed", res);
                }
                const { userId, treatmentDate, treatmentType, location } = req.body;
                const tokenData = jwt_1.JwtToken.get(req);
                if (!tokenData || isNaN(Number(tokenData.userId))) {
                    return (0, response_1.failureResponse)("Invalid or missing token data", res);
                }
                const createdBy = Number(tokenData.userId);
                const parsedUserId = Number(userId);
                if (isNaN(parsedUserId)) {
                    return (0, response_1.failureResponse)("Invalid user ID", res);
                }
                const reportFileUrl = req.file
                    ? `/upload/reports/${req.file.filename}`
                    : req.body.reportFileUrl;
                if (!reportFileUrl) {
                    return (0, response_1.failureResponse)("Report file URL is required", res);
                }
                const addResponse = yield medicalhistory_1.MedicalHistory.addMedicalHistory(parsedUserId, treatmentDate, treatmentType, location, reportFileUrl, createdBy);
                if (addResponse.err) {
                    return (0, response_1.failureResponse)(addResponse.message, res);
                }
                const response = Object.assign(Object.assign({}, addResponse.data), { createdBy: createdBy === 0 ? "admin" : "user" });
                return (0, response_1.successResponse)(response, "Medical History Added Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error adding medical history: " + error.message, res);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, response_1.failureResponse)("Validation failed", res);
                }
                const { hid } = req.params;
                const { userId, treatmentDate, treatmentType, location, reportFileUrl } = req.body;
                const tokenData = jwt_1.JwtToken.get(req);
                const parsedHid = Number(hid);
                const parsedUserId = Number(userId);
                const updatedBy = tokenData && tokenData.userId ? Number(tokenData.userId) : NaN;
                if (isNaN(parsedHid) || isNaN(parsedUserId) || isNaN(updatedBy)) {
                    return (0, response_1.failureResponse)("Invalid ID or User ID", res);
                }
                const reportUrl = req.file ? `/upload/reports/${req.file.filename}` : reportFileUrl;
                const result = yield medicalhistory_1.MedicalHistory.updateMedicalHistory(parsedHid, parsedUserId, treatmentDate, treatmentType, location, reportUrl, updatedBy);
                if (result.err) {
                    return (0, response_1.failureResponse)(result.message, res);
                }
                const response = Object.assign(Object.assign({}, result.data), { updatedBy: updatedBy === 0 ? "admin" : "user" });
                return (0, response_1.successResponse)(response, "Medical History Updated Successfully", res);
            }
            catch (err) {
                return (0, response_1.failureResponse)("Error updating medical history: " + err.message, res);
            }
        });
        this.getMedihis = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const hid = parseInt(req.params.hid, 10);
                if (isNaN(hid)) {
                    return (0, response_1.failureResponse)("Invalid HID provided", res);
                }
                const tokenData = jwt_1.JwtToken.get(req);
                if (!tokenData || isNaN(Number(tokenData.userId))) {
                    return (0, response_1.failureResponse)("Invalid or missing token data", res);
                }
                const historyResponse = yield medicalhistory_1.MedicalHistory.getMedicalHistoryById(hid);
                if (historyResponse.err) {
                    return (0, response_1.failureResponse)(historyResponse.message, res);
                }
                const history = (_a = historyResponse.data[0]) === null || _a === void 0 ? void 0 : _a.message;
                if (history) {
                    const messageLowerCase = history.toLowerCase();
                    if (messageLowerCase === "user does not exist") {
                        res.status(404).json({
                            code: 404,
                            status: false,
                            message: "Medical history not found",
                        });
                    }
                    if (messageLowerCase === "user is deleted") {
                        res.status(200).json({
                            code: 200,
                            status: false,
                            message: "User is deleted",
                        });
                    }
                    if (messageLowerCase === "history is deleted") {
                        res.status(200).json({
                            code: 200,
                            status: false,
                            message: "User is deleted",
                        });
                    }
                }
                if (historyResponse.data[0]) {
                    res.status(200).json({
                        code: 200,
                        status: true,
                        message: "Medical history retrieved successfully",
                        data: historyResponse.data[0],
                    });
                }
                res.status(404).json({
                    code: 404,
                    status: false,
                    message: "No data available for the history",
                });
            }
            catch (error) {
                if (!res.headersSent) {
                    return (0, response_1.failureResponse)("An unexpected error occurred: " + error.message, res);
                }
            }
        });
        // Delete Medical History
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const hid = parseInt(req.params.hid, 10);
                // Check if the HID is valid
                if (isNaN(hid)) {
                    return (0, response_1.failureResponse)("Invalid HID provided", res);
                }
                const tokenData = jwt_1.JwtToken.get(req);
                // Check if the token is valid
                if (!tokenData || isNaN(Number(tokenData.userId))) {
                    return (0, response_1.failureResponse)("Invalid or missing token data", res);
                }
                // Fetch medical history by ID
                const historyResponse = yield medicalhistory_1.MedicalHistory.getMedicalHistoryById(hid);
                if (historyResponse.err) {
                    return (0, response_1.failureResponse)(historyResponse.message, res);
                }
                const history = (_b = historyResponse.data[0]) === null || _b === void 0 ? void 0 : _b.message;
                if (history) {
                    const messageLowerCase = history.toLowerCase();
                    // Check for specific conditions in the response message
                    if (messageLowerCase === "history does not exist") {
                        return res.status(404).json({
                            code: 404,
                            status: false,
                            message: "Medical history not found",
                        });
                    }
                    if (messageLowerCase === "history is deleted") {
                        return res.status(200).json({
                            code: 200,
                            status: false,
                            message: "Medical history is already deleted",
                        });
                    }
                }
                // Check if history exists
                if (historyResponse.data[0]) {
                    return res.status(200).json({
                        code: 200,
                        status: true,
                        message: "Medical history deleted",
                    });
                }
            }
            catch (error) {
                // Handle unexpected errors
                if (!res.headersSent) {
                    return (0, response_1.failureResponse)("An unexpected error occurred: " + error.message, res);
                }
            }
        });
        // List All Medical Histories
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield medicalhistory_1.MedicalHistory.getAllMedicalHistory();
                if (result.err) {
                    return (0, response_1.failureResponse)(result.message, res);
                }
                const data = result.data.map((item) => (Object.assign(Object.assign({}, item), { createdBy: item.createdBy === 0 ? "admin" : "user", updatedBy: item.updatedBy === 0 ? "admin" : "user" })));
                return (0, response_1.successResponse)(data, "Medical history fetched successfully", res);
            }
            catch (err) {
                return (0, response_1.failureResponse)("Error fetching medical history: " + err.message, res);
            }
        });
    }
}
exports.MedicalHistoryController = MedicalHistoryController;
