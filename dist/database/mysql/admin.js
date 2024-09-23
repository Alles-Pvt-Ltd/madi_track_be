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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const connection_1 = require("./connection");
class Admin {
}
exports.Admin = Admin;
_a = Admin;
Admin.getAllGsList = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getAllGSList (${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Getting GS List" };
    }
    return { err: false, data: sqlData.result[0], message: "GS List Successfully Retrieved" };
});
Admin.getAllFamilies = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const gsDivisionId = divisionId !== null ? `${divisionId}` : "null";
    const sqlQueryString = `CALL sp_getAllFamilies (${gsDivisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Getting Family List" };
    }
    return { err: false, data: sqlData.result[0], message: "Family List Retrieved Successfuly" };
});
Admin.getAllFamilyTransfers = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getAllFamilyTransfersForADsDivision (${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Getting Family Transfer list" };
    }
    return { err: false, data: sqlData.result[0], message: "Family Transfer List Retrieved Successfuly" };
});
Admin.getMembersByFamilyId = (familyId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getMembersByFamilyId(${familyId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    // Log the SQL result to debug the data returned from the database
    console.log("SQL Data Result: ", sqlData.result); // <-- Add this line
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Getting Members List" };
    }
    return { err: false, data: sqlData.result[0], message: "Members List Successfully Retrieved" };
});
Admin.transferAcceptOrRejectByDs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_acceptOrRejectFamilyTransferByDs (${data.id},${data.status})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Updating Transfer Status" };
    }
    return { err: false, data: sqlData.result[0], message: "Family Transfer Status Updated Successfully" };
});
Admin.generateReport = (reportData) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_generateReport (
            ${reportData.searchText !== null ? `'${reportData.searchText}'` : "null"},
            ${reportData.gsDivisionId}, 
            ${reportData.villageId}, 
            ${reportData.ageFrom},
            ${reportData.ageTo},
            ${reportData.occupationId}, 
            ${reportData.jobStatusId}, 
            ${reportData.genderId}, 
            ${reportData.isMarried}, 
            ${reportData.isDeath}, 
            ${reportData.deathFromDate !== null ? `'${reportData.deathFromDate}'` : "null"}, 
            ${reportData.deathEndDate !== null ? `'${reportData.deathEndDate}'` : "null"})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error Occur While Getting Report" };
    }
    return { err: false, data: sqlData.result };
});
