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
exports.ServicesController = void 0;
const service_1 = require("../../modules/common/service");
const express_validator_1 = require("express-validator");
const services_1 = require("../../database/mysql/services/services");
const app_function_1 = require("../../app/app_function");
class ServicesController {
    constructor() {
        this.services = new services_1.Services();
    }
    getServices(req, res) {
        this.services.getServices(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get services successfull", d, res);
            }
        });
    }
    getAllServices(req, res) {
        this.services.getAllServices(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get all services successfull", d, res);
            }
        });
    }
    // add service photos
    // public addServices(req: any, res: Response) {
    //   this.services.addServices(req, (err, d, da) => {
    //     if (err) {
    //       return sqlError(err, res);
    //     } else {
    //       return successResponse("get all services successfull", d, res);
    //     }
    //   });
    // }
    // public getServiceImage(req: any, res: Response) {
    //   this.services.getServiceImage(req, (err, d, da) => {
    //     if (err) {
    //       sqlError(err, res);
    //     } else {
    //       successResponse("get service image successfull", d, res);
    //     }
    //   });
    // }
    //   add ez_lanka
    addService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const code = app_function_1.AppFucntion.uuid();
            req.body.code = code;
            // this.ez_lanka.addEz_lanka(req, (err, d, da) => {
            //   if (err) {
            //     return sqlError(err, res);
            //   } else {
            //     return successResponse("add role successfull", d, res);
            //   }
            // });
            this.services.addService(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("create service successfull", d, res);
                }
            });
        });
    }
    //   update ez_lanka
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.services.updateservice(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update service successfull", d, res);
                }
            });
        });
    }
    //   delete ez_lanka
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.services.updateservice(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("delete service successfull", d, res);
                }
            });
        });
    }
}
exports.ServicesController = ServicesController;
