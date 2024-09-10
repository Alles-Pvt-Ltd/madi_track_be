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
exports.Family = void 0;
const connection_1 = require("./connection");
class Family {
}
exports.Family = Family;
_a = Family;
Family.getDuplicateFamily = (nicNo, cardNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getFamilyByNicNo ('${nicNo}',${cardNumber})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Family.addFamily = (familyData) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_addFamily ('${familyData.cardNumber}', '${familyData.familyName}', '${familyData.address}',
        '${familyData.phone}', '${familyData.nicNo}', ${familyData.gsDivisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
Family.getAllFamiliesDetails = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getAllFamiliesOfGsDivision (${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
Family.getDuplicateMember = (firstName, lastName, familyId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getDuplicateMember ('${firstName}','${lastName}',${familyId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Family.addMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    const mobile = memberData.mobile !== null ? `'${memberData.mobile}'` : "NULL";
    const email = memberData.email !== null ? `'${memberData.email}'` : "NULL";
    const nicNo = memberData.nicNo !== null ? `'${memberData.nicNo}'` : "NULL";
    const sqlQueryString = `CALL sp_addMember ('${memberData.firstName}', '${memberData.lastName}', ${mobile}, ${email},
      ${memberData.gender}, ${memberData.role}, '${memberData.dateOfBirth}', ${nicNo}, ${memberData.occupation}, '${memberData.isGovernmentEmployee}',
      ${memberData.familyId})`;
    try {
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            throw new Error("Database Error");
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: true, message: error.message };
    }
});
Family.updateMemmber = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    const mobile = memberData.mobile !== null ? `'${memberData.mobile}'` : "NULL";
    const email = memberData.email !== null ? `'${memberData.email}'` : "NULL";
    const nicNo = memberData.nicNo !== null ? `'${memberData.nicNo}'` : "NULL";
    const sqlQueryString = `CALL sp_updateMember ('${memberData.id}', '${memberData.firstName}', '${memberData.lastName}', ${mobile}, ${email},
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', ${nicNo}, '${memberData.occupation}', '${memberData.isGovernmentEmployee}')`;
    try {
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            throw new Error("Database Error");
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: true, message: error.message };
    }
});
Family.getFamilyDetailsById = (familyId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getFamilyById (${familyId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
Family.addHistory = (historyData, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_addHistory ('${historyData.date}', '${historyData.description}', '${historyData.organization}',
    '${historyData.familyId}', NOW(), ${createdBy})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
Family.updateFamily = (familyData) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_updateFamily ('${familyData.id}', '${familyData.cardNumber}', '${familyData.familyName}', '${familyData.address}',
    '${familyData.phone}', '${familyData.nicNo}')`;
    try {
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            throw new Error("Database Error");
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: true, message: "Server Error Please contact admin" };
    }
});
Family.updateHistory = (historyData, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_updateHistory (${historyData.id},'${historyData.date}', '${historyData.description}', '${historyData.organization}',
    NOW(), ${updatedBy})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Cannot update, please try after sometime" };
    }
    return { err: false, data: sqlData.result };
});
Family.deleteHistory = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_deleteHistory (${id}, ${userId}, NOW())`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: "Error while delete, try after some time" };
    }
    return { err: false, data: sqlData.result };
});
Family.getMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getMemberById (${id})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
Family.initiateTransfer = (transferData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlQueryString = `CALL sp_initiateFamilyTransfer (${transferData.familyId}, ${transferData.oldDivision}, ${transferData.newDivision},
      '${transferData.reason}')`;
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: "Error occur while transfer, try after some time" };
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: false, message: "Server error, please contact admin" };
    }
});
Family.getAllFamilyTransfersForAGsDivision = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlQueryString = `CALL sp_getAllFamilyTransfersForAGsDivision (${divisionId})`;
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: "Error occur while getting transfer list, try after some time" };
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: false, message: "Server error, please contact admin" };
    }
});
Family.transferAcceptOrRejectByGs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlQueryString = `CALL sp_acceptOrRejectFamilyTransferByGs (${data.id},${data.status})`;
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: "Error occur while updating status, try after some time" };
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: false, message: "Server error, please contact admin" };
    }
});
