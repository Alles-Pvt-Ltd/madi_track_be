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
exports.Dashboard = void 0;
const connection_1 = require("./connection");
class Dashboard {
}
exports.Dashboard = Dashboard;
_a = Dashboard;
Dashboard.getFamiliesCount = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getFamiliesCount(${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Dashboard.getChildrenCount = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getChildrenCount(${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Dashboard.getEldersCount = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getEldersCount(${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Dashboard.getGovernmentEmployeesCount = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getGovernmentEmployeesCount(${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
Dashboard.getUniversityStudentsCount = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_getUniversityStudentsCount(${divisionId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
