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
exports.Ez_lankaController = void 0;
const service_1 = require("../../modules/common/service");
const express_validator_1 = require("express-validator");
const ez_lanka_1 = require("../../database/mysql/ez_lanka/ez_lanka");
const app_function_1 = require("../../app/app_function");
class Ez_lankaController {
    constructor() {
        this.ez_lanka = new ez_lanka_1.Ez_lanka();
    }
    //   get all ez_lanka
    getEz_lanka(req, res) {
        this.ez_lanka.getEz_lanka(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get ez_lanka successfull", d, res);
            }
        });
    }
    //   get all ez_lanka
    getAllEz_lanka(req, res) {
        this.ez_lanka.getAllEz_lanka(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get all ez_lanka successfull", d, res);
            }
        });
    }
    //   add ez_lanka
    addEz_lanka(req, res) {
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
            this.ez_lanka.addEz_lanka(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("create ez_lanka successfull", d, res);
                }
            });
        });
    }
    //   update ez_lanka
    updateEz_lanka(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.ez_lanka.updateEz_lanka(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update ez_lanka successfull", d, res);
                }
            });
        });
    }
    //   delete ez_lanka
    deleteEz_lanka(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.ez_lanka.updateEz_lanka(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("delete ez_lanka successfull", d, res);
                }
            });
        });
    }
}
exports.Ez_lankaController = Ez_lankaController;
