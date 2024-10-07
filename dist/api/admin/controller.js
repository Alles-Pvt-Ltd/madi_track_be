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
exports.AdminController = void 0;
const response_1 = require("../../core/response");
const helper_1 = require("../user/helper");
const admin_1 = require("../../database/mysql/admin");
const jwt_1 = require("../../core/jwt");
const user_1 = require("../../database/mysql/user");
class AdminController {
    constructor() {
        this.getAllGsList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            var userData = user_1.User.getUserByCode(jwtData.code);
            if (!(yield userData).data[0]) {
                return (0, response_1.failureResponse)("Please provide valid token", res);
            }
            const gsList = yield admin_1.Admin.getAllGsList((yield userData).data[0].gsDivisionId);
            if (gsList.err) {
                return (0, response_1.failureResponse)(gsList.message, res);
            }
            return (0, response_1.successResponse)(gsList.data, gsList.message, res);
        });
        this.getAllFamilies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const familyList = yield admin_1.Admin.getAllFamilies(req.body.divisionId);
            if (familyList.err) {
                return (0, response_1.failureResponse)(familyList.message, res);
            }
            return (0, response_1.successResponse)(familyList.data, familyList.message, res);
        });
        this.getAllFamilyTransfers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            const userInfo = yield user_1.User.getUserByCode(jwtData.code);
            if (userInfo.err || userInfo.data.length < 1) {
                return (0, response_1.failureResponse)(userInfo.message ? userInfo.message : "Cannot find user. Please login again", res);
            }
            const userDetail = yield user_1.User.userInfo(userInfo.data[0].id);
            if (userDetail.err) {
                return (0, response_1.failureResponse)("Error Occur, UserDetails Not Found", res);
            }
            var userInfoData = helper_1.default.userResponse(userDetail.data);
            var transferList;
            if (userInfoData.role == 1) {
                var defaultDivisionId = userInfoData.divisionIds.find(d => d.isDefault == 1).id;
                transferList = yield admin_1.Admin.getAllFamilyTransfers(defaultDivisionId);
            }
            else {
                transferList = yield admin_1.Admin.getAllFamilyTransfers(0);
            }
            if (transferList.err) {
                return (0, response_1.failureResponse)(transferList.message, res);
            }
            return (0, response_1.successResponse)(transferList.data, transferList.message, res);
        });
        // public updateFamilyTransferStatus = async (req: Request, res: Response) => {
        //     const updatedData = await Admin.transferAcceptOrRejectByDs(req.body);
        //     if(updatedData.err)
        //     {
        //         return failureResponse(updatedData.message,res);
        //     }
        //     return successResponse(updatedData.data, updatedData.message, res);
        // }
        this.getMembersByFamilyId = (req, res) => {
            const familyId = parseInt(req.params.familyId);
            if (isNaN(familyId)) {
                return (0, response_1.failureResponse)("Invalid familyId parameter. Please provide a valid family ID.", res);
            }
            admin_1.Admin.getMembersByFamilyId(familyId)
                .then(membersList => {
                if (membersList.err) {
                    console.error("Error while retrieving members list:", membersList.message);
                    return (0, response_1.failureResponse)(membersList.message, res);
                }
                return (0, response_1.successResponse)(membersList.data, membersList.message, res);
            })
                .catch(error => {
                console.error("Unexpected error during members retrieval:", error);
                return (0, response_1.failureResponse)("An unexpected error occurred during members retrieval.", res);
            });
        };
        this.generateReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reportData = yield admin_1.Admin.generateReport(req.body);
                if (reportData.err) {
                    throw Error(reportData.message);
                }
                return (0, response_1.successResponse)(reportData.data[0], "Report Generated Successfully", res);
            }
            catch (error) {
                return (0, response_1.failureResponse)(error.message, res);
            }
        });
    }
}
exports.AdminController = AdminController;
