"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopupReloadController = void 0;
const service_1 = require("../../modules/common/service");
const topup_reload_1 = require("../../database/mysql/topup_reload/topup_reload");
const app_function_1 = require("../../app/app_function");
class TopupReloadController {
    constructor() {
        this.topupReload = new topup_reload_1.TopupReload();
    }
    topupOrReload(req, res) {
        // it will identify the number is positive(1) or negetive(-1) or zero(0)
        var amount = req.body.amount;
        const amountSign = app_function_1.AppFucntion.getSignOfNumber(amount);
        // by using this we alow positive number(greater than 0)
        if (amountSign != 1) {
            return (0, service_1.failureResponse)("enter correct amount", req.body, res);
        }
        const typeOfAmount = app_function_1.AppFucntion.typeOfVariable(amount);
        const topupOrReload = () => {
            return this.topupReload.topupReload(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da.body, res);
                }
                else {
                    if (da.body.user_code) {
                        return (0, service_1.successResponse)("topup successfull", d, res);
                    }
                    else if (da.body.mobile) {
                        return (0, service_1.successResponse)("reload successfull", d, res);
                    }
                }
            });
        };
        if (typeOfAmount == "number") {
            topupOrReload();
        }
        else {
            const convertedAmount = app_function_1.AppFucntion.convertStringToNumber(amount);
            req.body.amount = convertedAmount;
            topupOrReload();
        }
    }
    topupDistributor(req, res) {
        var amount = req.body.amount;
        const amountSign = app_function_1.AppFucntion.getSignOfNumber(amount);
        if (amountSign != 1) {
            return (0, service_1.failureResponse)("enter correct amount", req.body, res);
        }
        const typeOfAmount = app_function_1.AppFucntion.typeOfVariable(amount);
        const topup = () => {
            return this.topupReload.topupDistributor(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da.body, res);
                }
                else {
                    return (0, service_1.successResponse)("topup distributor successfull", d, res);
                }
            });
        };
        if (typeOfAmount == "number") {
            topup();
        }
        else {
            const convertedAmount = app_function_1.AppFucntion.convertStringToNumber(amount);
            req.body.amount = convertedAmount;
            topup();
        }
    }
    topupHistory(req, res) {
        this.topupReload.topupHistory(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("topup history successfull", d, res);
            }
        });
    }
    reloadHistory(req, res) {
        this.topupReload.reloadHistory(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("reload history successfull", d, res);
            }
        });
    }
    reloadHistoryByMobile(req, res) {
        this.topupReload.reloadHistoryByMobile(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("reload history by mobile successfull", d, res);
            }
        });
    }
    ping(req, res) {
        this.topupReload.ping(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("Reload History Updated successfully", d, res);
            }
        });
    }
    reloadHistoryByReqid(req, res) {
        this.topupReload.reloadHistoryByReqid(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("Reload History by requid successfully", d, res);
            }
        });
    }
    reloadHistoryBydate(req, res) {
        this.topupReload.reloadHistoryBydate(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                // console.log(da);
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("reload history by date successfull", d, res);
            }
        });
    }
    adminBalance(req, res) {
        this.topupReload.adminBalance(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get admin balance successfull", d, res);
            }
        });
    }
    distibutorBalance(req, res) {
        this.topupReload.distibutorBalance(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor balance successfull", d, res);
            }
        });
    }
    getMoneyFromMerchant(req, res) {
        // it will identify the number is positive(1) ore negetive(-1) or zero(0)
        var amount = req.body.amount;
        const amountSign = app_function_1.AppFucntion.getSignOfNumber(amount);
        // by using this we alow positive number(greater than 0)
        if (amountSign != 1) {
            return (0, service_1.failureResponse)("enter correct amount", req.body, res);
        }
        const typeOfAmount = app_function_1.AppFucntion.typeOfVariable(amount);
        const getMoneyFromMerchant = () => {
            return this.topupReload.getMoneyFromMerchant(req, (err, d, da) => {
                const errorType = typeof err;
                if (errorType == "boolean" && err == true) {
                    return (0, service_1.sqlError)("", res);
                }
                else if (err) {
                    return (0, service_1.commenError)(err, da.body, res);
                }
                else {
                    return (0, service_1.successResponse)("get money from merchant and topup to distibutor", d, res);
                }
            });
        };
        if (typeOfAmount == "number") {
            getMoneyFromMerchant();
        }
        else {
            const convertedAmount = app_function_1.AppFucntion.convertStringToNumber(amount);
            req.body.amount = convertedAmount;
            getMoneyFromMerchant();
        }
    }
    adminTopupHistory(req, res) {
        console.log('228');
        this.topupReload.adminTopupHistory(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get admin topup history successfull", d, res);
            }
        });
    }
    distibutorTopupHistory(req, res) {
        console.log('228');
        this.topupReload.distibutorTopupHistory(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor topup history successfull", d, res);
            }
        });
    }
    adminTopupHistoryBydate(req, res) {
        this.topupReload.adminTopupHistoryBydate(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get admin topup history successfull by date", d, res);
            }
        });
    }
    distibutorTopupHistoryBydate(req, res) {
        this.topupReload.distibutorTopupHistoryBydate(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor topup history successfull by date", d, res);
            }
        });
    }
    adminTopupHistoryByMobile(req, res) {
        this.topupReload.adminTopupHistoryByMobile(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get admin topup history by mobile successfull", d, res);
            }
        });
    }
    distibutorTopupHistoryByMobile(req, res) {
        this.topupReload.distibutorTopupHistoryByMobile(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor topup history by mobile successfull ", d, res);
            }
        });
    }
    adminTopupHistoryByEmail(req, res) {
        this.topupReload.adminTopupHistoryByEmail(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get admin topup history by email successfull", d, res);
            }
        });
    }
    distibutorTopupHistoryByEmail(req, res) {
        this.topupReload.distibutorTopupHistoryByEmail(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da.body, res);
            }
            else {
                return (0, service_1.successResponse)("get distibutor topup history by email successfull ", d, res);
            }
        });
    }
}
exports.TopupReloadController = TopupReloadController;
