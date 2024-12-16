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
exports.MedicalHistory = void 0;
const connection_1 = require("./connection");
class MedicalHistory {
}
exports.MedicalHistory = MedicalHistory;
_a = MedicalHistory;
MedicalHistory.addMedicalHistory = (userId, treatmentDate, treatmentType, location, reportFileUrl, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!reportFileUrl) {
            throw new Error("Report file URL is required");
        }
        const sqlQueryString = `CALL sp_addMedicalHistory(${userId}, '${treatmentDate}', '${treatmentType}', '${location}', '${reportFileUrl}', ${createdBy})`;
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    }
    catch (error) {
        return { err: true, message: "Database error: " + error.message };
    }
});
MedicalHistory.updateMedicalHistory = (hid, userId, treatmentDate, treatmentType, location, reportFileUrl, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlQueryString = `CALL sp_updateMedicalHistory(${hid},${userId},'${treatmentDate}','${treatmentType}', '${location}',${reportFileUrl ? `'${reportFileUrl}'` : "NULL"}, ${updatedBy})`;
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    }
    catch (error) {
        return { err: true, message: "Database error: " + error.message };
    }
});
MedicalHistory.getMedicalHistoryById = (hid) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getMedicalHistoryById(${hid})`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
MedicalHistory.deleteMedicalHistory = (hid) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_deleteMedicalHistory(${hid})`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
MedicalHistory.getAllMedicalHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getAllMedicalHistory()`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
