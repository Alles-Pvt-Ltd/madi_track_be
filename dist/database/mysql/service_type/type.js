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
exports.Type = void 0;
const connection_1 = require("../connection");
const type_query_1 = require("./type_query");
const services_query_1 = require("../services/services_query");
const user_query_1 = require("../users/user_query");
const constant_1 = require("../../../config/constant");
const app_function_1 = require("../../../app/app_function");
class Type {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // get type 
    getType(req, cb) {
        const page_num = req.params.page_num;
        // get all type query
        const getType = type_query_1.TypeQuery.getType(page_num);
        // get all type
        return connection_1.default.connct(getType, req, (err, types, da) => {
            if (err) {
                return cb(err, types, da);
            }
            var getAllTypeCount = type_query_1.TypeQuery.getAllTypeCount();
            // get role
            return connection_1.default.connct(getAllTypeCount, req, (err, count, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, count, sys_da.body);
                }
                // by using this we deside how many pages we need
                const page_count = count[0].types_count / 10;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var type = { page_array: page_array, types: types, types_count: count };
                return cb(err, type, sys_da.body);
            });
        });
    }
    // get all type page_num
    getAllType(req, cb) {
        // get all type query
        const getAllType = type_query_1.TypeQuery.getAllType();
        // get all type
        return connection_1.default.connct(getAllType, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            return cb(err, d, da);
        });
    }
    // add type
    addType(req, cb) {
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
                if (user_roleid[0].role_id !== 2 && user_roleid[0].role_id !== 1) {
                    // console.log("53");
                    return cb(this.stringConstant.merchantsOrDistibutorCanNot, user_roleid, sys_da.body);
                }
                var getAllType = type_query_1.TypeQuery.getAllType();
                // get role
                return connection_1.default.connct(getAllType, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    // convert new role into lover case letter
                    const new_type = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                    // check new role already exist or not
                    const type = d.find((type) => {
                        const exist_type = app_function_1.AppFucntion.trimAndLovercase(type.type_name);
                        return exist_type === new_type;
                    });
                    // if role already exist
                    if (type) {
                        return cb(this.stringConstant.typeExist, d, req.body);
                    }
                    const code = req.body.code;
                    const name = req.body.name;
                    const created_by = req.user.id;
                    const updated_by = null;
                    const addType = type_query_1.TypeQuery.addType(code, name, created_by, updated_by);
                    // get role
                    return connection_1.default.connct(addType, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        const typeId = d.insertId;
                        const service_code = req.body.service_code;
                        const getAllDetailsOfServiceByCode = services_query_1.ServiceQuery.getAllDetailsOfServiceByCode(service_code);
                        // get role
                        return connection_1.default.connct(getAllDetailsOfServiceByCode, req, (err, d, sys_da) => {
                            // if we got error
                            if (err) {
                                return cb(err, d, sys_da.body);
                            }
                            const serviceId = d[0].id;
                            const addMapServiceType = type_query_1.TypeQuery.addMapServiceType(typeId, serviceId);
                            return connection_1.default.connct(addMapServiceType, req, (err, d, sys_da) => {
                                // if we got error
                                if (err) {
                                    return cb(err, d, sys_da.body);
                                }
                                return cb(err, d, sys_da.body);
                            });
                        });
                    });
                });
            });
        });
    }
    // add roles
    updateType(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role by code query
            const getTypeByCode = type_query_1.TypeQuery.getTypeByCode(req.params.code);
            // get user by code
            return connection_1.default.connct(getTypeByCode, null, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                //old role data by code
                const oldTypeData = d[0];
                if (!oldTypeData) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                // we are goin to use this function in two place
                const suportFunction = () => {
                    // if (req.body.is_deleted != 0 && !req.body.is_deleted) {
                    if (!req.body.is_deleted && req.body.is_deleted !== 0) {
                        req.body.is_deleted = oldTypeData.is_deleted;
                    }
                    if (!req.body.is_enabled && req.body.is_enabled !== 0) {
                        req.body.is_enabled = oldTypeData.is_enabled;
                    }
                    // console.log(oldTypeData);
                    const code = req.params.code;
                    const old_name = oldTypeData.type_name;
                    const new_name = req.body.name;
                    // const old_type_code = oldTypeData.type_code;
                    // const new_type_code = req.body.type_code;
                    const is_deleted = req.body.is_deleted;
                    const is_enabled = req.body.is_enabled;
                    const updated_by = req.user.id;
                    // console.log();
                    const updateType = type_query_1.TypeQuery.updateType(code, old_name, new_name, is_deleted, is_enabled, updated_by);
                    return connection_1.default.connct(updateType, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        const getAllDetailsOfTypeByCode = type_query_1.TypeQuery.getAllDetailsOfTypeByCode(code);
                        return connection_1.default.connct(getAllDetailsOfTypeByCode, null, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            // console.log(d);
                            if (req.body.service_code) {
                                const type_id = d[0].id;
                                const getAllDetailsOfServiceByCode = services_query_1.ServiceQuery.getAllDetailsOfServiceByCode(req.body.service_code);
                                return connection_1.default.connct(getAllDetailsOfServiceByCode, null, (err, d, da) => {
                                    if (err) {
                                        return cb(err, d, da);
                                    }
                                    console.log(d);
                                    const service_id = d[0].id;
                                    const updateMapServiceType = type_query_1.TypeQuery.updateMapServiceType(type_id, service_id);
                                    console.log(updateMapServiceType);
                                    return connection_1.default.connct(updateMapServiceType, null, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        return cb(err, d, da);
                                    });
                                });
                            }
                            else {
                                return cb(err, d, da);
                            }
                        });
                    });
                };
                // if we have req.body.name and the name not equal to that code of the role(oldTypeData.role_name)
                var getAllType = type_query_1.TypeQuery.getAllType();
                // get role
                return connection_1.default.connct(getAllType, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    if (req.body.name && req.body.name !== oldTypeData.type_name) {
                        // convert new role into lover case letter
                        const new_type = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                        const typeExist = d.find((type) => {
                            const exist_type = app_function_1.AppFucntion.trimAndLovercase(type.type_name);
                            return exist_type === new_type;
                        });
                        // if type already exist
                        if (typeExist) {
                            return cb(this.stringConstant.typeExist, d, req.body);
                        }
                        return suportFunction();
                    }
                    else if (req.body.type_code &&
                        req.body.type_code !== oldTypeData.type_code) {
                        // convert new role into lover case letter
                        const new_type_code = app_function_1.AppFucntion.trimAndLovercase(req.body.type_code);
                        const typeCodeExist = d.find((type) => {
                            const exist_type_code = app_function_1.AppFucntion.trimAndLovercase(type.type_code);
                            return exist_type_code === new_type_code;
                        });
                        // if type code already exist
                        if (typeCodeExist) {
                            return cb(this.stringConstant.typeCodeExist, d, req.body);
                        }
                        return suportFunction();
                    }
                    else {
                        return suportFunction();
                    }
                });
            });
        });
    }
}
exports.Type = Type;
