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
exports.FamilyController = void 0;
const family_1 = require("../../../database/mysql/family");
const response_1 = require("../../../core/response");
const express_validator_1 = require("express-validator");
const helper_1 = require("./helper");
const user_1 = require("../../../database/mysql/user");
const jwt_1 = require("../../../core/jwt");
class FamilyController {
    constructor() {
        this.addFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = req.body;
            const duplicateFamily = yield family_1.Family.getDuplicateFamily(body.nicNo);
            if (duplicateFamily.data.length !== 0) {
                return (0, response_1.failureResponse)("Family Already Exist", res);
            }
            const addedFamily = yield family_1.Family.addFamily(body);
            if (addedFamily.err) {
                return (0, response_1.failureResponse)(addedFamily.message, res);
            }
            return (0, response_1.successResponse)(addedFamily.data, "Family Added Successfully", res);
        });
        this.getAllFamiliesDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            const familiesDetails = yield family_1.Family.getAllFamiliesDetails(userInfo.data[0].gsDivisionId);
            if (familiesDetails.err) {
                return (0, response_1.failureResponse)(familiesDetails.message, res);
            }
            return (0, response_1.successResponse)(helper_1.default.familyResponse(familiesDetails.data[0], familiesDetails.data[1]), "Families Got Successfully", res);
        });
        this.addMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const duplicateMember = yield family_1.Family.getDuplicateMember(body.nicNo);
            if (duplicateMember.data.length !== 0) {
                return (0, response_1.failureResponse)("Member Already Exist", res);
            }
            const insertedData = yield family_1.Family.addMember(body);
            if (insertedData.err) {
                return (0, response_1.failureResponse)(insertedData.message, res);
            }
            return (0, response_1.successResponse)(insertedData.data, "Member Added Successfully", res);
        });
        this.updateMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const updatedData = yield family_1.Family.updateMemmber(body);
            if (updatedData.err) {
                return (0, response_1.failureResponse)(updatedData.message, res);
            }
            return (0, response_1.successResponse)(updatedData.data, "Member updated Successfully", res);
        });
        this.getFamilyDetailsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const familyId = parseInt(req.params.familyId);
            const familyDetails = yield family_1.Family.getFamilyDetailsById(familyId);
            if (familyDetails.err) {
                return (0, response_1.failureResponse)(familyDetails.message, res);
            }
            const response = helper_1.default.singleFamilyResponse(familyDetails.data[0], familyDetails.data[1], familyDetails.data[2]);
            return (0, response_1.successResponse)(response, "Family Details Retrieved Successfully", res);
        });
        this.addHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            const addedHistory = yield family_1.Family.addHistory(req.body, userInfo.data[0].id);
            if (addedHistory.err) {
                return (0, response_1.failureResponse)(addedHistory.message, res);
            }
            return (0, response_1.successResponse)(addedHistory.data, "History Added Successfully", res);
        });
    }
}
exports.FamilyController = FamilyController;
