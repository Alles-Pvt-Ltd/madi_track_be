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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Users = void 0;
var connection_1 = require("../../mysql/connection");
var constant_1 = require("../../../config/constant");
var user_query_1 = require("./user_query");
// import { login } from "../../api/user/class";
// import {dateTime}  from "node-datetime";
var Users = /** @class */ (function () {
    function Users() {
        this.stringConstant = new constant_1.StringConstant();
        // // delete user by code
        // public deleteUser(req: any, cb: any) {
        //   const userDetail = Query.getUser( req.params.code);
        //   return Mysql.connct(userDetail, null, (err, d, da) => {
        //     if (err) {
        //       return cb(err, d, da);
        //     }
        //     const data = d[0];
        //     if (!data) {
        //       return cb("unable to get data for this user id", d, da);
        //     }
        //     // var queryString = `UPDATE users
        //     //   SET is_deleted='0'
        //     //   WHERE code = '${code}'`;
        //     // return Mysql.connct(queryString, null, (err, d, da) => {
        //     //   return cb(err, d, da);
        //     // });
        //   });
        // }
    }
    // login
    Users.prototype.login = function (req, res, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = user_query_1.Query.loginQuery(req);
                return [2 /*return*/, connection_1["default"].connct(queryString, req, function (err, d, sys_da) {
                        return cb(err, d, sys_da.body);
                    })];
            });
        });
    };
    Users.prototype.addRegister = function (user_params, cb) {
        if (user_params.req.body.is_enabled != 1) {
            user_params.req.body.is_enabled = 0;
        }
        if (user_params.req.body.is_deleted != 0) {
            user_params.req.body.is_deleted = 1;
        }
        //user add query
        var queryString = user_query_1.Query.addUser(user_params);
        return connection_1["default"].connct(queryString, null, function (err, d, sys_da) {
            var addUserRole = user_query_1.Query.addRole(d, user_params);
            connection_1["default"].connct(addUserRole, null, function (err, d, sys_da) {
                if (err) {
                    return cb(err, d, sys_da);
                }
            });
            return cb(err, d, sys_da);
        });
    };
    // get all user
    Users.prototype.getAllUser = function (req, cb) {
        // get all user query
        var queryString = user_query_1.Query.getAllUser();
        return connection_1["default"].connct(queryString, null, function (err, d, da) {
            return cb(err, d, da);
        });
    };
    // get User By code
    Users.prototype.getUserById = function (req, cb) {
        var queryString = user_query_1.Query.getUserByCode(req.params.code);
        return connection_1["default"].connct(queryString, null, function (err, d, sys_da) {
            return cb(err, d, sys_da);
        });
    };
    // get User By Name
    Users.prototype.getUserByName = function (req, cb) {
        var queryString = user_query_1.Query.getUserByName(req.params.name);
        return connection_1["default"].connct(queryString, null, function (err, d, sys_da) {
            return cb(err, d, sys_da);
        });
    };
    // get User By Mobile Number
    Users.prototype.getUserByMobileNo = function (req, cb) {
        var queryString = user_query_1.Query.getUserByMobileNo(req.params.mobile);
        return connection_1["default"].connct(queryString, null, function (err, d, sys_da) {
            return cb(err, d, sys_da);
        });
    };
    // update user by code
    Users.prototype.updateUser = function (user_params, cb) {
        var _this = this;
        // get user by code
        var queryString = user_query_1.Query.getUser(user_params.req.params.code);
        return connection_1["default"].connct(queryString, null, function (err, d, da) {
            if (err) {
                return cb(err, d, da);
            }
            var data = d[0];
            if (!data) {
                return cb(_this.stringConstant.unableGet, d, da);
            }
            if (user_params.req.body.is_enabled != 0 &&
                !user_params.req.body.is_enabled) {
                user_params.req.body.is_enabled = data.is_enabled;
            }
            if (user_params.req.body.is_deleted != 0 &&
                !user_params.req.body.is_deleted) {
                user_params.req.body.is_deleted = data.is_deleted;
            }
            // SQL update user by code
            var queryString = user_query_1.Query.updateUser(data, user_params);
            // SQL get user role detail using user id
            var userRole = user_query_1.Query.getUserRoleByUserId(data.id);
            connection_1["default"].connct(userRole, null, function (err, d, da) {
                var data = d[0];
                // if the data is empty
                if (!data) {
                    return cb(_this.stringConstant.unableGet, d, da);
                }
                // get user role data for user id
                if (user_params.req.body.is_role_deleted != 0 &&
                    !user_params.req.body.is_role_deleted) {
                    user_params.req.body.is_role_deleted = data.is_deleted;
                }
                // SQL update user role by user id
                var updateRole = user_query_1.Query.updateUserRoleByUserId(user_params, data);
                // update user by code
                connection_1["default"].connct(updateRole, null, function (err, d, da) {
                    if (err) {
                        return cb(err, d, da);
                    }
                });
            });
            return connection_1["default"].connct(queryString, null, function (err, d, da) {
                return cb(err, d, da);
            });
        });
    };
    return Users;
}());
exports.Users = Users;
