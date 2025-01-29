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
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertUserQuery = `CALL sp_register(${user.role}, '${user.firstname}', '${user.lastname}', '${user.address}', '${user.username}', '${user.email}', '${user.password}', ${user.createdBy}, ${user.parentId || 'NULL'})`;
                const result = yield connection_1.default.connect(insertUserQuery, null);
                if (result.err) {
                    return { err: true, message: result.result };
                }
                return { err: false, data: result.result[0] };
            }
            catch (error) {
                return { err: true, message: 'Database query failed' };
            }
        });
    }
    static updateUser(id, data, updatedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserQuery = `CALL sp_updateUser( ${data.role}, '${data.firstname}', '${data.lastname}', '${data.address}', '${data.email}', ${data.password ? `'${data.password}'` : 'NULL'},  ${updatedBy}, ${id} )`;
            const sqlData = yield connection_1.default.connect(updateUserQuery, null);
            if (sqlData.err) {
                return { err: true, message: sqlData.result };
            }
            return { err: false, data: sqlData.result[0] };
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id, isDeleted FROM t_user WHERE id = ?';
            const result = yield connection_1.default.connect(query, [id]);
            if (!result || !result.result.length) {
                return { err: true, data: null };
            }
            return { err: false, data: result.result[0] };
        });
    }
}
exports.User = User;
_a = User;
User.findUserByUsername = (userName, email) => __awaiter(void 0, void 0, void 0, function* () {
    let sqlQueryString = '';
    if (userName && email) {
        sqlQueryString = `CALL sp_findUserByUsername('${userName}', '${email}')`;
    }
    else if (userName) {
        sqlQueryString = `CALL sp_findUserByUsername('${userName}', NULL)`;
    }
    else if (email) {
        sqlQueryString = `CALL sp_findUserByUsername(NULL, '${email}')`;
    }
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (!sqlData.result || sqlData.result.length === 0 || sqlData.result[0].length === 0) {
        return { err: true, message: "User not found" };
    }
    return { err: false, data: sqlData.result[0][0] };
});
User.getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getAllUser()`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
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
    return { err: false, data: sqlData.result[0] };
});
