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
class AppController {
    constructor() {
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, response_1.failureResponse)("Validation failed", res);
                }
                const { title, description, img_url } = req.body;
                // If file is uploaded, use the file URL
                const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url; // Use the provided img_url if no file
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
            try {
                const sid = parseInt(req.params.sid, 10);
                const getResponse = yield app_1.App.getIntroById(sid);
                if (getResponse.err) {
                    return (0, response_1.failureResponse)(getResponse.message, res);
                }
                return (0, response_1.successResponse)(getResponse.data, "Intro Screen Retrieved Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error retrieving intro: " + error.message, res);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return (0, response_1.failureResponse)("Validation failed", res);
                }
                const sid = parseInt(req.params.sid, 10);
                const { title, description, img_url } = req.body;
                // If file is uploaded, use the file URL
                const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url; // Use the provided img_url if no file
                const updateResponse = yield app_1.App.updateIntro(sid, title, description, imgUrl);
                if (updateResponse.err) {
                    return (0, response_1.failureResponse)(updateResponse.message, res);
                }
                return (0, response_1.successResponse)(updateResponse.data, "Intro Screen Updated Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error updating intro: " + error.message, res);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sid = parseInt(req.params.sid, 10);
                const deleteResponse = yield app_1.App.deleteIntro(sid);
                if (deleteResponse.err) {
                    return (0, response_1.failureResponse)(deleteResponse.message, res);
                }
                return (0, response_1.successResponse)(deleteResponse.data, "Intro Screen Deleted Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error deleting intro: " + error.message, res);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllResponse = yield app_1.App.getAllIntro();
                if (getAllResponse.err) {
                    return (0, response_1.failureResponse)(getAllResponse.message, res);
                }
                return (0, response_1.successResponse)(getAllResponse.data, "All Intro Screens Retrieved Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)("Error retrieving intros: " + error.message, res);
            }
        });
    }
}
exports.AppController = AppController;
