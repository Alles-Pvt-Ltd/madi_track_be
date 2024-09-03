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
exports.Services = void 0;
const connection_1 = require("../../mysql/connection");
const services_query_1 = require("./services_query");
const user_query_1 = require("../../../database/mysql/users/user_query");
const constant_1 = require("../../../config/constant");
const app_function_1 = require("../../../app/app_function");
class Services {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // get service
    getServices(req, cb) {
        const page_number = req.params.page_number;
        // get all services query
        const getServices = services_query_1.ServiceQuery.getServices(page_number);
        // get all services
        return connection_1.default.connct(getServices, req, (err, services, da) => {
            if (err) {
                return cb(err, services, da);
            }
            var getAllServicesCount = services_query_1.ServiceQuery.getAllServicesCount();
            // get services
            return connection_1.default.connct(getAllServicesCount, req, (err, d, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, d, sys_da.body);
                }
                // by using this we deside how many pages we need
                const page_count = d[0].services_count / 10;
                console.log(page_count);
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var service = { page_array: page_array, services: services, services_count: d };
                return cb(err, service, sys_da.body);
            });
        });
    }
    // get all service
    getAllServices(req, cb) {
        // get all services query
        const getAllServices = services_query_1.ServiceQuery.getAllServices();
        // get all services
        return connection_1.default.connct(getAllServices, req, (err, services, da) => {
            if (err) {
                return cb(err, services, da);
            }
            return cb(err, services, da.body);
        });
    }
    // add roles
    addService(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("33");
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
                // console.log(user_roleid[0].role_id);
                // console.log(typeof user_roleid[0].role_id);
                if (user_roleid[0].role_id !== 2 && user_roleid[0].role_id !== 1) {
                    // console.log("53");
                    return cb(this.stringConstant.merchantsOrDistibutorCanNot, user_roleid, sys_da.body);
                }
                var getAllServices = services_query_1.ServiceQuery.getAllServices();
                // get role
                return connection_1.default.connct(getAllServices, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    // convert new role into lover case letter
                    const new_services = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                    // check new role already exist or not
                    const services = d.find((service) => {
                        const exist_service = app_function_1.AppFucntion.trimAndLovercase(service.service_name);
                        return exist_service === new_services;
                    });
                    // if service already exist
                    if (services) {
                        return cb(this.stringConstant.serviceExist, d, req.body);
                    }
                    const code = req.body.code;
                    const name = req.body.name;
                    // const service_code = req.body.service_code;
                    const created_by = req.user.id;
                    const updated_by = null;
                    const addService = services_query_1.ServiceQuery.addService(code, name, created_by, updated_by);
                    // get role
                    return connection_1.default.connct(addService, req, (err, d, sys_da) => {
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
    updateservice(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role by code query
            const getServiceByCode = services_query_1.ServiceQuery.getServiceByCode(req.params.code);
            // get user by code
            return connection_1.default.connct(getServiceByCode, null, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                //old role data by code
                const oldServiceData = d[0];
                if (!oldServiceData) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                // we are goin to use this function in two place
                const suportFunction = () => {
                    // if (req.body.is_deleted != 0 && !req.body.is_deleted) {
                    if (!req.body.is_deleted && req.body.is_deleted !== 0) {
                        req.body.is_deleted = oldServiceData.is_deleted;
                    }
                    if (!req.body.is_enabled && req.body.is_enabled !== 0) {
                        req.body.is_enabled = oldServiceData.is_enabled;
                    }
                    // console.log(oldServiceData);
                    const code = req.params.code;
                    const old_name = oldServiceData.service_name;
                    const new_name = req.body.name;
                    // const old_service_code = oldServiceData.service_code;
                    // const new_service_code = req.body.service_code;
                    const is_deleted = req.body.is_deleted;
                    const is_enabled = req.body.is_enabled;
                    const updated_by = req.user.id;
                    console.log();
                    const updateService = services_query_1.ServiceQuery.updateService(code, old_name, new_name, is_deleted, is_enabled, updated_by);
                    return connection_1.default.connct(updateService, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        return cb(err, d, da);
                    });
                };
                // if we have req.body.name and the name not equal to that code of the role(oldServiceData.role_name)
                var getAllServices = services_query_1.ServiceQuery.getAllServices();
                // get role
                return connection_1.default.connct(getAllServices, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    if (req.body.name && req.body.name !== oldServiceData.service_name) {
                        // convert new role into lover case letter
                        const new_services = app_function_1.AppFucntion.trimAndLovercase(req.body.name);
                        const serviceExist = d.find((service) => {
                            const exist_service = app_function_1.AppFucntion.trimAndLovercase(service.service_name);
                            return exist_service === new_services;
                        });
                        // if service already exist
                        if (serviceExist) {
                            return cb(this.stringConstant.serviceExist, d, req.body);
                        }
                        return suportFunction();
                    }
                    // else if (
                    //   req.body.service_code &&
                    //   req.body.service_code !== oldServiceData.service_code
                    // ) {
                    //     // convert new role into lover case letter
                    //     const new_services_code = AppFucntion.trimAndLovercase(
                    //       req.body.service_code
                    //     );
                    //     const serviceCodeExist = d.find((service) => {
                    //       console.log(service);
                    //       const exist_service_code = AppFucntion.trimAndLovercase(
                    //         service.service_code
                    //       );
                    //       return exist_service_code === new_services_code;
                    //     });
                    //     // if service code already exist
                    //     if (serviceCodeExist) {
                    //       return cb(this.stringConstant.serviceCodeExist, d, req.body);
                    //     }
                    //     return suportFunction();
                    // }
                    else {
                        return suportFunction();
                    }
                });
            });
        });
    }
}
exports.Services = Services;
