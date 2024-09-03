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
exports.Roles = void 0;
const connection_1 = require("../connection");
const constant_1 = require("../../../config/constant");
const roles_query_1 = require("./roles_query");
const user_query_1 = require("../users/user_query");
const app_function_1 = require("../../../app/app_function");
class Roles {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // getAllRoles
    getAllRoles(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_number = req.params.page_number;
            // get role query
            var getRoles = roles_query_1.RolesQuery.getRoles(page_number);
            // get role
            return connection_1.default.connct(getRoles, req, (err, roles, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, roles, sys_da.body);
                }
                var getAllRolesCount = roles_query_1.RolesQuery.getAllRolesCount();
                // get role
                return connection_1.default.connct(getAllRolesCount, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // by using this we deside how many pages we need
                    const page_count = d[0].roles_count / 10;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var role = { page_array: page_array, roles: roles, roles_count: d };
                    return cb(err, role, sys_da.body);
                });
            });
        });
    }
    // add roles
    addRoles(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role query
            const findCreatorRole = user_query_1.Query.findCreatorRole(req.user.id);
            // get role
            return connection_1.default.connct(findCreatorRole, req, (err, d, sys_da) => {
                const user_roleid = d;
                if (err) {
                    return cb(err, user_roleid, sys_da.body);
                }
                if (user_roleid.length < 1) {
                    return cb(this.stringConstant.unableGet, user_roleid, sys_da.body);
                }
                console.log(user_roleid[0].role_id);
                // admin and supper can only create create role
                // if (user_roleid[0].role_id !== 2 || user_roleid[0].role_id !== 1) {
                //   return cb(
                //     this.stringConstant.merchantsCanNot,
                //     user_roleid,
                //     sys_da.body
                //   );
                // }
                var getAllRoles = roles_query_1.RolesQuery.getAllRoles();
                // get role
                return connection_1.default.connct(getAllRoles, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    // convert new role into lover case letter
                    const new_role = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                    // check new role already exist or not
                    const role = d.find((role) => {
                        const exist_role = app_function_1.AppFucntion.trimAndLovercase(role.role_name);
                        return exist_role === new_role;
                    });
                    // if role already exist
                    if (role) {
                        return cb(this.stringConstant.roleExist, d, req.body);
                    }
                    const name = req.body.name;
                    const code = req.body.code;
                    const created_by = req.user.id;
                    const updated_by = null;
                    const addRole = roles_query_1.RolesQuery.addRole(code, name, created_by, updated_by);
                    // get role
                    return connection_1.default.connct(addRole, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        return cb(err, d, sys_da.body);
                    });
                });
            });
        });
    }
    // add roles
    updateRoles(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role by code query
            const getRoleByCode = roles_query_1.RolesQuery.getRoleByCode(req.params.code);
            // get user by code
            return connection_1.default.connct(getRoleByCode, null, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                //old role data by code
                const oldRoleData = d[0];
                if (!oldRoleData) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                // we are goin to use this function in two place
                const suportFunction = () => {
                    // if (req.body.is_deleted != 0 && !req.body.is_deleted) {
                    if (!req.body.is_deleted && req.body.is_deleted !== 0) {
                        req.body.is_deleted = oldRoleData.is_deleted;
                    }
                    const code = req.params.code;
                    const old_name = oldRoleData.role_name;
                    const new_name = req.body.name;
                    const new_is_deleted = req.body.is_deleted;
                    const new_updated_by = req.user.id;
                    const updateRole = roles_query_1.RolesQuery.updateRole(code, old_name, new_name, new_is_deleted, new_updated_by);
                    return connection_1.default.connct(updateRole, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        return cb(err, d, da);
                    });
                };
                // if we have req.body.name and the name not equal to that code of the role(oldRoleData.role_name)
                if (req.body.name && req.body.name !== oldRoleData.role_name) {
                    var getAllOldRoles = roles_query_1.RolesQuery.getAllRoles();
                    // get role
                    return connection_1.default.connct(getAllOldRoles, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        // if we did not got error
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, sys_da.body);
                        }
                        // convert new role into lover case letter
                        const new_role = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                        const roleExist = d.find((role) => {
                            const exist_role = app_function_1.AppFucntion.trimAndLovercase(role.role_name);
                            return exist_role === new_role;
                        });
                        // if role already exist
                        if (roleExist) {
                            return cb(this.stringConstant.roleExist, d, req.body);
                        }
                        return suportFunction();
                        // if we do not pass is_deleted oldUserData from body
                        // console.log(req.body.is_deleted);
                    });
                }
                else {
                    return suportFunction();
                }
            });
        });
    }
}
exports.Roles = Roles;
