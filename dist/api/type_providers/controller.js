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
exports.ProvidersController = void 0;
const service_1 = require("../../modules/common/service");
const express_validator_1 = require("express-validator");
const app_function_1 = require("../../app/app_function");
const providers_1 = require("../../database/mysql/type_providers/providers");
const constant_1 = require("../../config/constant");
class ProvidersController {
    constructor() {
        this.providers = new providers_1.Providers();
        this.stringConstant = new constant_1.StringConstant();
    }
    getAllProviders(req, res) {
        this.providers.getAllProviders(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get all providers successfull", d, res);
            }
        });
    }
    getProviders(req, res) {
        this.providers.getProviders(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get providers successfull", d, res);
            }
        });
    }
    getProviderByCode(req, res) {
        this.providers.getProviderByCode(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get providers by code successfull", d, res);
            }
        });
    }
    getAllProvidersDetails(req, res) {
        this.providers.getAllProvidersDetails(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get all service of type of providers successfull", d, res);
            }
        });
    }
    //   add ez_lanka
    addProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const code = app_function_1.AppFucntion.uuid();
            req.body.code = code;
            this.providers.addProvider(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    const errorToString = String(d);
                    //  here we check that , we get error by updating existing values eg:email or phone number
                    const errorByDublicate = errorToString.includes("ER_DUP_ENTRY");
                    if (errorByDublicate) {
                        // mobile number duplicate entry
                        const errorByDublicateProviderCode = errorToString.includes("providers.code_UNIQUE");
                        // email duplicate entry
                        const errorByDublicateEzlankaProviderCode = errorToString.includes("providers.ez_lanka_provider_id_UNIQUE");
                        if (errorByDublicateProviderCode) {
                            return (0, service_1.commenError)(this.stringConstant.providerCodeAlreadyExist, da, res);
                        }
                        else if (errorByDublicateEzlankaProviderCode) {
                            return (0, service_1.commenError)(this.stringConstant.ezlanakaProviderCodeAlreadyExist, da, res);
                        }
                    }
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("create Providers successfull", d, res);
                }
            });
        });
    }
    //   update providers
    updateProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.providers.updateProvider(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    const errorToString = String(d);
                    //  here we check that , we get error by updating existing values eg:email or phone number
                    const errorByDublicate = errorToString.includes("ER_DUP_ENTRY");
                    if (errorByDublicate) {
                        // mobile number duplicate entry
                        const errorByDublicateProviderCode = errorToString.includes("providers.code_UNIQUE");
                        // email duplicate entry
                        const errorByDublicateEzlankaProviderCode = errorToString.includes("providers.ez_lanka_provider_id_UNIQUE");
                        if (errorByDublicateProviderCode) {
                            return (0, service_1.commenError)(this.stringConstant.providerCodeAlreadyExist, da, res);
                        }
                        else if (errorByDublicateEzlankaProviderCode) {
                            return (0, service_1.commenError)(this.stringConstant.ezlanakaProviderCodeAlreadyExist, da, res);
                        }
                    }
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update Providers successfull", d, res);
                }
            });
        });
    }
    //   delete providers
    deleteProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            this.providers.updateProvider(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("delete Providers successfull", d, res);
                }
            });
        });
    }
    //   add ez_lanka
    updateCommission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const validation = await validationResult(req).array(); //here we validate user request before create post
            // // if we have validation error
            // if (validation[0]) {
            //   return validationError(validation[0].msg, req.body,res);
            // }
            this.providers.updateCommission(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da, res);
                }
                else {
                    return (0, service_1.successResponse)("update Providers commission successfull", d, res);
                }
            });
        });
    }
    getDistibutorCommission(req, res) {
        this.providers.getDistibutorCommission(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor commission successfull ", d, res);
            }
        });
    }
    //   add ez_lanka
    addPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            var packagesObject = req.body.package;
            const packages = () => {
                const code = app_function_1.AppFucntion.uuid();
                req.body.code = code;
                return this.providers.addPackage(req, (err, d, da) => {
                    const errorType = typeof err;
                    if (errorType == "boolean" && err == true) {
                        return (0, service_1.sqlError)("", res);
                    }
                    else if (err) {
                        return (0, service_1.commenError)(err, da.body, res);
                    }
                    else {
                        return (0, service_1.successResponse)("create package successfull", d, res);
                    }
                });
            };
            var check = 0;
            packagesObject.map((packageObject) => {
                var provider_percentage = packageObject.provider_percentage;
                var admin_gave_commission_to_distibutor = packageObject.admin_gave_commission_to_distibutor;
                const typeOfProviderPercentage = app_function_1.AppFucntion.typeOfVariable(provider_percentage);
                const typeOfAdminGaveCommissionToDistibutorPercentage = app_function_1.AppFucntion.typeOfVariable(admin_gave_commission_to_distibutor);
                if (typeOfProviderPercentage !== "number" && provider_percentage !== null || typeOfAdminGaveCommissionToDistibutorPercentage !== "number" && admin_gave_commission_to_distibutor !== null) {
                    console.log(typeOfProviderPercentage);
                    console.log(typeOfAdminGaveCommissionToDistibutorPercentage);
                    console.log('273');
                    ++check;
                    //  failureResponse("enter correct provider_percentage or admin offer commision,", packageObject, res);
                }
            });
            if (check > 0) {
                return (0, service_1.failureResponse)("enter correct provider_percentage or admin offer commision,", req.body, res);
            }
            else {
                return packages();
            }
            // const convertedProviderPercentage = AppFucntion.convertStringToNumber(provider_percentage);
            // const convertedAdminGaveCommissionToDistibutorPercentage = AppFucntion.convertStringToNumber(provider_percentage);
            // req.body.provider_percentage = convertedProviderPercentage;
            // req.body.admin_gave_commission_to_distibutor=convertedAdminGaveCommissionToDistibutorPercentage;
            // packages();
        });
    }
    getPackage(req, res) {
        this.providers.getPackage(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get providers package successfull", d, res);
            }
        });
    }
    getPackageByCode(req, res) {
        this.providers.getPackageByCode(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get providers package by code successfull", d, res);
            }
        });
    }
}
exports.ProvidersController = ProvidersController;
