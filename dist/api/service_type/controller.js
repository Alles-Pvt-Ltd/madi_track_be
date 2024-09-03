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
exports.TypeController = void 0;
const service_1 = require("../../modules/common/service");
const express_validator_1 = require("express-validator");
const type_1 = require("../../database/mysql/service_type/type");
const app_function_1 = require("../../app/app_function");
class TypeController {
    constructor() {
        this.type = new type_1.Type();
    }
    // get types using pagination
    getType(req, res) {
        this.type.getType(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get type successfull", d, res);
            }
        });
    }
    // get all types
    getAllType(req, res) {
        this.type.getAllType(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get all type successfull", d, res);
            }
        });
    }
    //   add ez_lanka
    addType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const code = app_function_1.AppFucntion.uuid();
            req.body.code = code;
            this.type.addType(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("create type successfull", d, res);
                }
            });
        });
    }
    //   update ez_lanka
    updateType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.type.updateType(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update type successfull", d, res);
                }
            });
        });
    }
    //   delete ez_lanka
    deleteType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.type.updateType(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("delete type successfull", d, res);
                }
            });
        });
    }
}
exports.TypeController = TypeController;
