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
exports.User = void 0;
const connection_1 = require("./connection");
class User {
}
exports.User = User;
_a = User;
User.findUserByUsername = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_findUserByUsername ('${userName}')`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
User.register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const insertUser = `CALL sp_register ('${data.code}','${data.firstName}', '${data.lastName}', '${data.userName}', '${data.password}', '${data.role}',${data.gsDivisionId})`;
    const sqlData = yield connection_1.default.connect(insertUser, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
User.getUserByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    let relatedQuery = `CALL sp_getUserByCode ('${code}')`;
    const sqlData = yield connection_1.default.connect(relatedQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
User.reference = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_reference ()`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
User.changePassword = (code, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `UPDATE t_user SET password='${password}' WHERE code='${code}'`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return {
        err: false,
        data: sqlData.result,
        message: "Password changed successfully",
    };
});
User.getUserDivision = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_userDetails (${userId})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: true, data: sqlData.result };
});
