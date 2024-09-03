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
exports.Ez_lanka = void 0;
const connection_1 = require("../connection");
const constant_1 = require("../../../config/constant");
const ez_lanka_query_1 = require("./ez_lanka_query");
const user_query_1 = require("../users/user_query");
const app_function_1 = require("../../../app/app_function");
class Ez_lanka {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // getRoles page_num
    getEz_lanka(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_num = req.params.page_num;
            // get role query
            var getEz_lankaProviders = ez_lanka_query_1.Ez_lankaQuery.getEz_lankaProviders(page_num);
            // get role
            return connection_1.default.connct(getEz_lankaProviders, req, (err, ezlanka, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, ezlanka, sys_da.body);
                }
                // // if we did not got error
                // if (d.length < 1) {
                //   return cb(this.stringConstant.unableGet, d, sys_da.body);
                // }
                var getAllEz_lankaProvidersCount = ez_lanka_query_1.Ez_lankaQuery.getAllEz_lankaProvidersCount();
                // get role
                return connection_1.default.connct(getAllEz_lankaProvidersCount, req, (err, count, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, count, sys_da.body);
                    }
                    // by using this we deside how many pages we need
                    const page_count = count[0].ezlankaCount / 10;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var ezlanka_provider = { page_array: page_array, ezlanka_providers: ezlanka, ezlanka_providers_count: count };
                    return cb(err, ezlanka_provider, sys_da.body);
                });
            });
        });
    }
    getAllEz_lanka(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role query
            var getAllEz_lankaProviders = ez_lanka_query_1.Ez_lankaQuery.getAllEz_lankaProviders();
            // get role
            return connection_1.default.connct(getAllEz_lankaProviders, req, (err, d, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, d, sys_da.body);
                }
                // if we did not got error
                if (d.length < 1) {
                    return cb(this.stringConstant.unableGet, d, sys_da.body);
                }
                return cb(err, d, sys_da.body);
            });
        });
    }
    // add roles
    addEz_lanka(req, cb) {
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
                //   admin and supper can only create create role
                if (user_roleid[0].role_id !== 2 && user_roleid[0].role_id !== 1) {
                    return cb(this.stringConstant.merchantsOrDistibutorCanNot, user_roleid, sys_da.body);
                }
                var getAllEz_lankaProviders = ez_lanka_query_1.Ez_lankaQuery.getAllEz_lankaProviders();
                // get role
                return connection_1.default.connct(getAllEz_lankaProviders, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    // convert new role into lover case letter
                    const new_ez_lanka_provider = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                    // check new role already exist or not
                    const provider = d.find((provider) => {
                        const exist_provider = app_function_1.AppFucntion.trimAndLovercase(provider.ezlanka_provider_name);
                        return exist_provider === new_ez_lanka_provider;
                    });
                    // console.log("83");
                    // if role already exist
                    if (provider) {
                        return cb(this.stringConstant.ezlanakaProviderNameAlreadyExist, d, req.body);
                    }
                    // convert new role into lover case letter
                    const new_ez_lanka_provider_code = app_function_1.AppFucntion.trimAndLovercase(req.body.op_code);
                    // check new role already exist or not
                    const provider_code = d.find((provider) => {
                        const exist_provider_code = app_function_1.AppFucntion.trimAndLovercase(provider.op_code);
                        return exist_provider_code === new_ez_lanka_provider_code;
                    });
                    // console.log("83");
                    // if role already exist
                    if (provider_code) {
                        return cb(this.stringConstant.ezlanakaProviderCodeAlreadyExist, d, req.body);
                    }
                    const name = req.body.name;
                    const code = req.body.code;
                    const op_code = req.body.op_code;
                    const created_by = req.user.id;
                    const updated_by = null;
                    const addEz_lankProvider = ez_lanka_query_1.Ez_lankaQuery.addEz_lankProvider(code, name, op_code, created_by, updated_by);
                    // console.log(addEz_lankProvider);
                    // get role
                    return connection_1.default.connct(addEz_lankProvider, req, (err, d, sys_da) => {
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
    updateEz_lanka(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role by code query
            const getEz_lankaProviderByCode = ez_lanka_query_1.Ez_lankaQuery.getEz_lankaProviderByCode(req.params.code);
            // get user by code
            return connection_1.default.connct(getEz_lankaProviderByCode, null, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                //old role data by code
                const oldEz_lanka_providerData = d[0];
                if (!oldEz_lanka_providerData) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                // we are goin to use this function in two place
                const suportFunction = () => {
                    // if (req.body.is_deleted != 0 && !req.body.is_deleted) {
                    console.log(req.body.is_deleted);
                    if (!req.body.is_deleted && req.body.is_deleted !== 0) {
                        console.log('155');
                        req.body.is_deleted = oldEz_lanka_providerData.is_deleted;
                    }
                    console.log('159');
                    const code = req.params.code;
                    const old_name = oldEz_lanka_providerData.provider_name;
                    const new_name = req.body.name;
                    const old_op_code = oldEz_lanka_providerData.op_code;
                    const new_op_code = req.body.op_code;
                    const new_is_deleted = req.body.is_deleted;
                    const new_updated_by = req.user.id;
                    const updateEz_lankProvider = ez_lanka_query_1.Ez_lankaQuery.updateEz_lankProvider(code, old_name, new_name, old_op_code, new_op_code, new_is_deleted, new_updated_by);
                    // console.log(updateEz_lankProvider);
                    return connection_1.default.connct(updateEz_lankProvider, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        return cb(err, d, da);
                    });
                };
                // if we have req.body.name and the name not equal to that code of the role(oldEz_lanka_providerData.role_name)
                if (req.body.name &&
                    req.body.name !== oldEz_lanka_providerData.provider_name) {
                    console.log('190');
                    var getAllEz_lankaProviders = ez_lanka_query_1.Ez_lankaQuery.getAllEz_lankaProviders();
                    // get role
                    return connection_1.default.connct(getAllEz_lankaProviders, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        // if we did not got error
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, sys_da.body);
                        }
                        // convert new role into lover case letter
                        const new_ez_lanka_provider = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                        const providerExist = d.find((provider) => {
                            const exist_provider = app_function_1.AppFucntion.trimAndLovercase(provider.ezlanka_provider_name);
                            return exist_provider === new_ez_lanka_provider;
                        });
                        // if provider already exist
                        if (providerExist) {
                            return cb(this.stringConstant.ezlanakaProviderNameAlreadyExist, d, req.body);
                        }
                        // convert new role into lover case letter
                        const new_ez_lanka_provider_code = app_function_1.AppFucntion.trimAndLovercase(req.body.op_code);
                        const providerExist_code = d.find((provider) => {
                            const exist_provider_code = app_function_1.AppFucntion.trimAndLovercase(provider.op_code);
                            return exist_provider_code === new_ez_lanka_provider_code;
                        });
                        // if provider already exist
                        if (providerExist_code) {
                            return cb(this.stringConstant.ezlanakaProviderCodeAlreadyExist, d, req.body);
                        }
                        return suportFunction();
                    });
                }
                else {
                    return suportFunction();
                }
            });
        });
    }
}
exports.Ez_lanka = Ez_lanka;
