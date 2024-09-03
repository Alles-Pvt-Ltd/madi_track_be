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
exports.RolesController = void 0;
const service_1 = require("../../modules/common/service");
const express_validator_1 = require("express-validator");
const roles_1 = require("../../database/mysql/roles/roles");
const app_function_1 = require("../../app/app_function");
class RolesController {
    constructor() {
        this.roles = new roles_1.Roles();
    }
    //   get all roles
    getAllRoles(req, res) {
        this.roles.getAllRoles(req, (err, d, da) => {
            if (err) {
                return (0, service_1.sqlError)(err, res);
            }
            else {
                return (0, service_1.successResponse)("get roles successfull", d, res);
            }
        });
    }
    //   add roles
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const code = app_function_1.AppFucntion.uuid();
            req.body.code = code;
            // this.roles.addRoles(req, (err, d, da) => {
            //   if (err) {
            //     return sqlError(err, res);
            //   } else {
            //     return successResponse("add role successfull", d, res);
            //   }
            // });
            this.roles.addRoles(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("create roles successfull", d, res);
                }
            });
        });
    }
    //   update roles
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.roles.updateRoles(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update role successfull", d, res);
                }
            });
        });
    }
    //   delete roles
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.roles.updateRoles(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("delete role successfull", d, res);
                }
            });
        });
    }
}
exports.RolesController = RolesController;
