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
User.findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_findUserByUsername('${username}')`;
    try {
        const sqlData = yield connection_1.default.connect(sqlQueryString, null);
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        if (!sqlData.result || sqlData.result.length === 0) {
            return { err: false, data: [] };
        }
        return { err: false, data: sqlData.result };
    }
    catch (error) {
        return { err: true, message: "Error connecting to the database" };
    }
});
User.register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const insertUser = `CALL sp_register(NULL, ${data.role}, '${data.firstName}', '${data.lastName}', '${data.address}', '${data.username}', '${data.email}', '${data.password}')`;
    const sqlData = yield connection_1.default.connect(insertUser, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
User.updateUser = (id, data, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOn = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updateUserQuery = `
            CALL sp_updateUser(${data.role}, '${data.firstName}','${data.lastName}','${data.address}', '${data.email}', '${data.password}', ${updatedBy}, '${updatedOn}', ${id} )`;
    const sqlData = yield connection_1.default.connect(updateUserQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
User.getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getAllUser()`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
User.getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getUserById(${id})`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
User.deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_deleteUser(${id})`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result };
});
