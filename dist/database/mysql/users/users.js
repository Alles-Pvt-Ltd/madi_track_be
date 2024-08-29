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
exports.Users = void 0;
const connection_1 = require("../../mysql/connection");
const constant_1 = require("../../../config/constant");
const user_query_1 = require("./user_query");
class Users {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // login
    login(req, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get data by phone query
            var getUserByPhone = user_query_1.Query.getUserByPhone(req.body.mobile);
            // get data by email
            return connection_1.default.connct(getUserByPhone, req, (err, d, sys_da) => {
                return cb(err, d, sys_da.body);
            });
            // }
        });
    }
    addRegister(user_params, cb) {
        // find creater role by using user code query
        const findCreatorRole = user_query_1.Query.findCreatorRole(user_params.req.user.id);
        // find creater role by using user code
        return connection_1.default.connct(findCreatorRole, user_params.req, (err, data, sys_da) => {
            const user_roleid = data;
            if (err) {
                return cb(err, user_roleid, sys_da.body);
            }
            if (user_roleid.length < 1) {
                return cb(this.stringConstant.unableGet, user_roleid, sys_da.body);
            }
            // merchant will have role id 4 and he do not have access to create user
            if (user_roleid[0].role_id == 4 || user_roleid[0].role_id == 2) {
                return cb(this.stringConstant.merchantsCanNot, user_roleid, sys_da.body);
            }
            //user add query
            const getUserByEmail = user_query_1.Query.getUserByEmail(user_params.req.body.email);
            //user add
            return connection_1.default.connct(getUserByEmail, user_params.req, (err, d, sys_da) => {
                if (err) {
                    return cb(err, d, sys_da.body);
                }
                // if we got result for email
                if (d.length > 0) {
                    return cb(this.stringConstant.emailAlreadyExist, d, sys_da.body);
                }
                //user add query
                const getUserByPhone = user_query_1.Query.getUserByPhone(user_params.req.body.mobile);
                //user add
                return connection_1.default.connct(getUserByPhone, user_params.req, (err, d, sys_da) => {
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we got result for phone number
                    if (d.length > 0) {
                        return cb(this.stringConstant.phoneNumberAlreadyExist, d, sys_da.body);
                    }
                    const body = user_params.req.body;
                    const code = user_params.code;
                    // const name = body.name;
                    const password = body.password;
                    const first_name = body.first_name;
                    const last_name = body.last_name;
                    const email = body.email;
                    const mobile = body.mobile;
                    const created_by = user_params.created_by;
                    const updated_by = user_params.updated_by;
                    //user add query
                    // const addUser = Query.addUser(user_params);
                    const addUser = user_query_1.Query.addUser(code, password, first_name, last_name, email, mobile, created_by, updated_by);
                    //user add
                    return connection_1.default.connct(addUser, user_params.req, (err, d, sys_da) => {
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        const successfulllyUserAdded = d;
                        if (user_roleid[0].role_id == 1) {
                            var user_role = 3;
                            // const addDistributors = Query.addDistributors(user_params);
                        }
                        else if (user_roleid[0].role_id == 3) {
                            var user_role = 4;
                        }
                        //user role add query
                        // const addUserRole = Query.addRole(user_params);
                        const user_id = successfulllyUserAdded.insertId;
                        // const user_role= user_params.req.userRole
                        const created_by = user_params.created_by;
                        const updated_by = user_params.updated_by;
                        const addUserRole = user_query_1.Query.addRole(user_id, user_role, created_by, updated_by);
                        return connection_1.default.connct(addUserRole, user_params.req, (err, d, sys_da) => {
                            if (err) {
                                return cb(err, d, sys_da.body);
                            }
                            // get creator by user code query
                            const getUser = user_query_1.Query.getUser(user_params.req.user.id);
                            // get creator by user code query
                            return connection_1.default.connct(getUser, user_params.req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da.body);
                                }
                                // add creator id
                                const createrId = d[0].id;
                                if (user_roleid[0].role_id == 1) {
                                    // add distibutor id
                                    const distributors_id = successfulllyUserAdded.insertId;
                                    const addDistributors = user_query_1.Query.addDistributors(distributors_id);
                                    return connection_1.default.connct(addDistributors, user_params.req, (err, d, da) => {
                                        return cb(err, d, da.body);
                                    });
                                }
                                else if (user_roleid[0].role_id == 3) {
                                    // add merchant id
                                    const merchant_id = successfulllyUserAdded.insertId;
                                    const addMerchants = user_query_1.Query.addMerchants(createrId, merchant_id);
                                    return connection_1.default.connct(addMerchants, user_params.req, (err, d, da) => {
                                        return cb(err, d, da.body);
                                    });
                                }
                                return cb(err, d, sys_da.body);
                            });
                        });
                    });
                });
            });
        });
    }
    // get all user
    getAllUser(req, cb) {
        // get all user query
        const queryString = user_query_1.Query.getAllUser();
        return connection_1.default.connct(queryString, null, (err, d, da) => {
            return cb(err, d, da);
        });
    }
    // get User By code
    getUserById(req, cb) {
        const queryString = user_query_1.Query.getUserByCode(req.params.code);
        console.log(queryString);
        return connection_1.default.connct(queryString, null, (err, d, sys_da) => {
            return cb(err, d, sys_da);
        });
    }
    // get User By Name
    getUserByName(req, cb) {
        const queryString = user_query_1.Query.getUserByName(req.params.name);
        return connection_1.default.connct(queryString, null, (err, d, sys_da) => {
            return cb(err, d, sys_da);
        });
    }
    // get User By Mobile Number
    getUserByMobileNo(req, cb) {
        const queryString = user_query_1.Query.getUserByMobileNo(req.params.mobile);
        return connection_1.default.connct(queryString, null, (err, d, sys_da) => {
            return cb(err, d, sys_da);
        });
    }
    // update user by code
    updateUser(user_params, cb) {
        // get user by code query
        const getUser = user_query_1.Query.getUser(user_params.req.params.code);
        // get user by code
        return connection_1.default.connct(getUser, null, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            const oldUserData = d[0];
            if (!oldUserData) {
                return cb(this.stringConstant.unableGet, d, da);
            }
            // if we do not pass is_enabled oldUserData from body
            if (user_params.req.body.is_enabled != 0 &&
                !user_params.req.body.is_enabled) {
                user_params.req.body.is_enabled = oldUserData.is_enabled;
            }
            console.log(user_params.req.body.is_enabled);
            // if we do not pass is_deleted oldUserData from body
            // console.log(user_params.req.body.is_deleted);
            if (user_params.req.body.is_deleted != 0 &&
                !user_params.req.body.is_deleted) {
                user_params.req.body.is_deleted = oldUserData.is_deleted;
            }
            // console.log( user_params.req.body.is_deleted);
            // const new_name = user_params.req.body.name;
            const new_is_enabled = user_params.req.body.is_enabled;
            const new_first_name = user_params.req.body.first_name;
            const new_last_name = user_params.req.body.last_name;
            const new_email = user_params.req.body.email;
            const new_mobile = user_params.req.body.mobile;
            const new_is_deleted = user_params.req.body.is_deleted;
            const new_updated_by = user_params.updated_by;
            // const new_code = user_params.req.params.code;
            // console.log(new_code);
            const user_code = oldUserData.code;
            // const old_name = oldUserData.name;
            const old_first_name = oldUserData.first_name;
            const old_last_name = oldUserData.last_name;
            const old_email = oldUserData.email;
            const old_mobile = oldUserData.mobile;
            // console.log(user_code);
            // SQL update user by code
            const updateUser = user_query_1.Query.updateUser(user_code, old_first_name, old_last_name, old_email, old_mobile, new_is_enabled, new_first_name, new_last_name, new_email, new_mobile, new_is_deleted, new_updated_by);
            console.log(updateUser);
            // const updateUser = Query.updateUser(oldUserData, user_params);
            // (we will use in future)[
            // SQL get user role detail using user id
            // const getUserRole = Query.getUserRoleByUserId(data.id);
            // return Mysql.connct(getUserRole, null, (err, d, da) => {
            //   const data = d[0];
            //   // if the data is empty
            //   if (!data) {
            //     return cb(this.stringConstant.unableGet, d, da);
            //   }
            //   // get user role data for user id
            //   if (
            //     user_params.req.body.is_role_deleted != 0 &&
            //     !user_params.req.body.is_role_deleted
            //   ) {
            //     user_params.req.body.is_role_deleted = data.is_deleted;
            //   }
            // // SQL update user role by user id
            // const updateRole = Query.updateUserRoleByUserId(user_params, data);
            // // update user role by code
            // return Mysql.connct(updateRole, null, (err, d, da) => {
            //   if (err) {
            //     return cb(err, d, da);
            //   }]
            // update user by code
            return connection_1.default.connct(updateUser, null, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                return cb(err, d, da);
            });
        });
        //   });
        // });
    }
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
    getMerchantByDistubuterId(req, cb) {
        // get distibutor code from url
        const distubuterCode = req.params.code;
        const pageNumber = req.params.page_number;
        // get user details by using distibutor code query
        const getUser = user_query_1.Query.getUser(distubuterCode);
        // get user details by using distibutor code
        return connection_1.default.connct(getUser, req, (err, d, sys_da) => {
            if (err) {
                return cb(err, d, sys_da);
            }
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, sys_da);
            }
            const dis_id = d[0].id;
            // find merchant details using code query
            const getMerchantByDistubuterId = user_query_1.Query.getMerchantByDistubuterId(dis_id, pageNumber);
            // find merchant details using code query
            return connection_1.default.connct(getMerchantByDistubuterId, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                const getMerchantByDistubuterIdCount = user_query_1.Query.getMerchantByDistubuterIdCount(dis_id);
                return connection_1.default.connct(getMerchantByDistubuterIdCount, req, (err, d, da) => {
                    // by using this we deside how many pages we need
                    const page_count = d[0].merchants_count / 10;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    console.log(page_count);
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var users = { page_array: page_array, merchants: data, merchants_count: d };
                    return cb(err, users, da);
                });
            });
        });
    }
    getAllDistubuter(req, cb) {
        const pageNumber = req.params.page_number;
        // find all distubuters query
        const getDistubuter = user_query_1.Query.getDistubuter(pageNumber);
        // find all distubuters
        return connection_1.default.connct(getDistubuter, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            const getAllDistubuterCount = user_query_1.Query.getAllDistubuterCount();
            return connection_1.default.connct(getAllDistubuterCount, null, (err, d, da) => {
                // by using this we deside how many pages we need
                const page_count = d[0].users_count / 10;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var users = { page_array: page_array, users: data, users_count: d };
                return cb(err, users, da);
            });
        });
    }
}
exports.Users = Users;
