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
const family_1 = require("../../database/mysql/family");
const response_1 = require("../../core/response");
const express_validator_1 = require("express-validator");
const helper_1 = require("./helper");
const user_1 = require("../../database/mysql/user");
const jwt_1 = require("../../core/jwt");
class FamilyController {
    constructor() {
        this.addFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, response_1.badResponse)(errors.array(), res);
            }
            const body = req.body;
            const duplicateFamily = yield family_1.Family.getDuplicateFamily(body.cardNumber, body.gsDivisionId);
            if (duplicateFamily.data && duplicateFamily.data.length !== 0) {
                return (0, response_1.failureResponse)("Family Already Exist", res);
            }
            const addedFamily = yield family_1.Family.addFamily(body);
            if (addedFamily.err) {
                return (0, response_1.failureResponse)(addedFamily.message, res);
            }
            return (0, response_1.successResponse)(addedFamily.data, "Family Added Successfully", res);
        });
        this.getAllFamiliesDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gsDivisionId = parseInt(req.params.divisionId);
            const familiesDetails = yield family_1.Family.getAllFamiliesDetails(gsDivisionId);
            if (familiesDetails.err) {
                return (0, response_1.failureResponse)(familiesDetails.message, res);
            }
            return (0, response_1.successResponse)(helper_1.default.familyResponse(familiesDetails.data[0], familiesDetails.data[1]), "Families Got Successfully", res);
        });
        this.addMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const duplicateMember = yield family_1.Family.getDuplicateMember(body.firstName, body.lastName, body.familyId);
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
            if (!familyDetails.data[0][0]) {
                return (0, response_1.failureResponse)("Cannot find family Details", res);
            }
            const response = helper_1.default.singleFamilyResponse(familyDetails.data[0], familyDetails.data[1], familyDetails.data[2], familyDetails.data[3]);
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
        this.updateFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const updatedData = yield family_1.Family.updateFamily(body);
            if (updatedData.err) {
                return (0, response_1.failureResponse)(updatedData.message, res);
            }
            return (0, response_1.successResponse)(updatedData.data, "Family updated Successfully", res);
        });
        this.updateHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            const updatedHistory = yield family_1.Family.updateHistory(req.body, userInfo.data[0].id);
            if (updatedHistory.err) {
                return (0, response_1.failureResponse)(updatedHistory.message, res);
            }
            return (0, response_1.successResponse)(updatedHistory.data, "History Updated Successfully", res);
        });
        this.deleteHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err) {
                return (0, response_1.failureResponse)(userInfo.message, res);
            }
            const historyDelete = yield family_1.Family.deleteHistory(parseInt(req.params.id), userInfo.data[0].id);
            if (historyDelete.err) {
                return (0, response_1.failureResponse)(historyDelete.message, res);
            }
            return (0, response_1.successResponse)(historyDelete.data, "History Deleted Successfully", res);
        });
        this.getMemmberById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const memberId = parseInt(req.params.id);
            const memberDetails = yield family_1.Family.getMemberById(memberId);
            if (memberDetails.err) {
                return (0, response_1.failureResponse)(memberDetails.message, res);
            }
            return (0, response_1.successResponse)(helper_1.default.memberResponse(memberDetails.data), "member Details Retrieved Successfully", res);
        });
        this.initiateFamilyTransfer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transferData = req.body;
            const transferDetail = yield family_1.Family.initiateTransfer(transferData);
            if (transferDetail.err) {
                return (0, response_1.failureResponse)(transferDetail.message, res);
            }
            return (0, response_1.successResponse)(transferDetail.data[0], "Successfully initiated transfer request", res);
        });
        this.initiateMemberTransfer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transferData = req.body;
            console.log(transferData);
            const transferDetail = yield family_1.Family.initiateMemberTransfer(transferData.memberId, transferData.reasonId);
            if (transferDetail.err) {
                return (0, response_1.failureResponse)(transferDetail.message, res);
            }
            return (0, response_1.successResponse)("Successfully initiated", "Success", res);
        });
        //   public getAllFamilyTransfersForAGsDivision = async (req: Request, res: Response) => {
        //     const gsDivisionId = parseInt(req.params.divisionId);
        //     const transferList = await Family.getAllFamilyTransfersForAGsDivision(gsDivisionId);
        //     if (transferList.err) {
        //         return failureResponse(transferList.message, res);
        //     }
        //     if(transferList.data[0].length === 0)
        //     {
        //         return failureResponse("No Pending Transfers", res);
        //     }
        //     return successResponse(transferList.data[0],"Successfully get all tranfers",res);
        //   }
        this.transferAcceptOrRejectByGs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transferData = req.body;
            const updatedDetail = yield family_1.Family.familyTransferStatusUpdate(transferData);
            if (updatedDetail.err) {
                return (0, response_1.failureResponse)(updatedDetail.message, res);
            }
            return (0, response_1.successResponse)("Updated successfully.", "Successfully updated status", res);
        });
        this.addProperty = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const addedProperty = yield family_1.Family.addProperty(req.body);
            if (addedProperty.err) {
                return (0, response_1.failureResponse)(addedProperty.message, res);
            }
            return (0, response_1.successResponse)(addedProperty.data[0], "Property Successfully Added", res);
        });
    }
}
exports.FamilyController = FamilyController;
