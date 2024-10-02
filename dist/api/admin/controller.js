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
const admin_1 = require("../../database/mysql/admin");
const jwt_1 = require("../../core/jwt");
const user_1 = require("../../database/mysql/user");
class AdminController {
    constructor() {
        this.getAllGsList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jwtData = jwt_1.JwtToken.get(req);
            var userData = user_1.User.getUserByCode(jwtData.code);
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
            const dsDivisionId = parseInt(req.params.divisionId);
            const transferList = yield admin_1.Admin.getAllFamilyTransfers(dsDivisionId);
            if (transferList.err) {
                return (0, response_1.failureResponse)(transferList.message, res);
            }
            return (0, response_1.successResponse)(transferList.data, transferList.message, res);
        });
        this.updateFamilyTransferStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedData = yield admin_1.Admin.transferAcceptOrRejectByDs(req.body);
            if (updatedData.err) {
                return (0, response_1.failureResponse)(updatedData.message, res);
            }
            return (0, response_1.successResponse)(updatedData.data, updatedData.message, res);
        });
        this.getMembersByFamilyId = (req, res) => {
            const familyId = parseInt(req.params.familyId);
            console.log("Request received for familyId:", familyId);
            if (isNaN(familyId)) {
                return (0, response_1.failureResponse)("Invalid familyId parameter. Please provide a valid family ID.", res);
            }
            admin_1.Admin.getMembersByFamilyId(familyId)
                .then(membersList => {
                if (membersList.err) {
                    console.error("Error while retrieving members list:", membersList.message);
                    return (0, response_1.failureResponse)(membersList.message, res);
                }
                console.log("Members list successfully retrieved:", membersList.data);
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
