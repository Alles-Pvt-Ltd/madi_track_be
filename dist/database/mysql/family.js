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
Family.getDuplicateFamily = (nicNo) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getFamilyByNicNo ('${nicNo}')`;
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
Family.getDuplicateMember = (nicNo) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getMemberByNicNo ('${nicNo}')`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Family.addMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_addMember ('${memberData.firstName}', '${memberData.lastName}', '${memberData.mobile}', '${memberData.email}',
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', '${memberData.nicNo}', '${memberData.occupation}', '${memberData.isGovernmentEmployee}',
      '${memberData.familyId}')`;
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
    const sqlQueryString = `CALL sp_updateMember ('${memberData.id}', '${memberData.firstName}', '${memberData.lastName}', '${memberData.mobile}', '${memberData.email}',
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', '${memberData.nicNo}', '${memberData.occupation}', '${memberData.isGovernmentEmployee}')`;
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
