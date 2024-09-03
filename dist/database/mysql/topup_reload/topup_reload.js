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
exports.TopupReload = void 0;
const connection_1 = require("../../mysql/connection");
const topup_reload_query_1 = require("./topup_reload_query");
const user_query_1 = require("../users/user_query");
const constant_1 = require("../../../config/constant");
const api_1 = require("../../../api/ez_lanka/api");
const ping = require("ping");
const app_function_1 = require("../../../app/app_function");
class TopupReload {
    constructor() {
        // create stringConstant opject
        this.stringConstant = new constant_1.StringConstant();
    }
    // topup and reload
    topupReload(req, cb) {
        // this is the function refresh the reload history and update the pending status to current status of the pending status eg:pending will be ['pending','refund']
        // this.uploadReloadHistory(req, cb);
        // get merchant by user code query
        var getUserIdByUserCode = user_query_1.Query.getUser(req.user.id);
        return connection_1.default.connct(getUserIdByUserCode, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            // if user not available for user code
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, da);
            }
            if (d[0].is_enabled === 0) {
                return cb(this.stringConstant.userDisabled, d, da);
            }
            else if (d[0].is_deleted === 1) {
                return cb(this.stringConstant.userDeleted, d, da);
            }
            else {
                // by using this condition we can find this is for topup
                if (req.body.user_code) {
                    // get user by user code query
                    var getUserIdByUserCode = user_query_1.Query.getUser(req.body.user_code);
                    return connection_1.default.connct(getUserIdByUserCode, req, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        // if user not available for user code
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, da);
                        }
                        // add user id in request body
                        const merchant_id = d[0].id;
                        // get merchant details by using merchant id.
                        const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(merchant_id);
                        //  get  merchants details by user id
                        return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            // if mechants not available for user id
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da);
                            }
                            // this is the previous amount of merchant
                            const previousAmountOfMechant = d[0].amount;
                            // here we add previous amount with topup amount
                            req.body.currentAmountOfMechant =
                                previousAmountOfMechant + req.body.amount;
                            // topup merchant query
                            const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(req.body.currentAmountOfMechant, merchant_id);
                            // get distributor by user id
                            const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].distributors_id);
                            // get distributors by distibutir id
                            return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                // if distributors not available for user id
                                if (d.length < 1) {
                                    return cb(this.stringConstant.unableGet, d, da);
                                }
                                const distributor_id = d[0].distributors_id;
                                // previous amount of distributor
                                const previousAmountOfDistributor = d[0].amount;
                                // here we check distributor have enough amount to topup to merchant
                                if (previousAmountOfDistributor < req.body.amount &&
                                    req.body.user_code) {
                                    return cb(this.stringConstant.notEnoughMoneyToTopup, d, da);
                                }
                                // if distributor have enough amount we reduce topup amount from distributor amount
                                req.body.currentAmountOfDistributor =
                                    previousAmountOfDistributor - req.body.amount;
                                //  add topup to distributor query
                                const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, d[0].distributors_id);
                                // add topup history query
                                const addTopUpHistory = topup_reload_query_1.TopUpReloadQuery.addTopUpHistory(req.body.amount, distributor_id, merchant_id);
                                // add topup history
                                return connection_1.default.connct(addTopUpHistory, req, (err, d, da) => {
                                    if (err) {
                                        return cb(err, d, da);
                                    }
                                    // add topup to distributors
                                    return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        //   add topup to merchants
                                        return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                                            return cb(err, d, da);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else if (req.body.mobile) {
                    // we assign valuse from request body
                    const mobile = req.body.mobile;
                    const amount = req.body.amount;
                    // here we generate random value for request id
                    const reqid = Math.random().toString(26).slice(2);
                    // here we are getting ezlanka provider code
                    const getProvider = topup_reload_query_1.TopUpReloadQuery.getProvider(req.body.op_code);
                    return connection_1.default.connct(getProvider, req, (err, d, da) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return cb(err, d, da);
                        }
                        const opcode = d[0].opcode;
                        const type_id = d[0].type_id;
                        // get merchant by user code query
                        var getUserIdByUserCode = user_query_1.Query.getUser(req.user.id);
                        return connection_1.default.connct(getUserIdByUserCode, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            // if user not available for user code
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da);
                            }
                            // add merchant id in request body
                            const merchant_id = d[0].id;
                            // get merchant details by merchant id
                            const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(merchant_id);
                            // get service by service code query
                            const getProvidersPercentageByProviderCode = topup_reload_query_1.TopUpReloadQuery.getProvidersPercentageByProviderCode(req.body.op_code);
                            // get service by service code
                            return connection_1.default.connct(getProvidersPercentageByProviderCode, req, (err, data, da) => {
                                if (err) {
                                    return cb(err, data, da);
                                }
                                // if mechants not available for user id
                                if (data.length < 1) {
                                    return cb(this.stringConstant.unableGet, d, da);
                                }
                                // req.servide_id = data[0].service_id;
                                // req.provider_id = data[0].provider_id;
                                const provider_id = data[0].provider_id;
                                // get  merchants by user id
                                return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                                    if (err) {
                                        return cb(err, d, da);
                                    }
                                    // if mechants not available for user id
                                    if (d.length < 1) {
                                        return cb(this.stringConstant.unableGet, d, da);
                                    }
                                    //here check merchant have enough amount for reload
                                    if (d[0].amount < req.body.amount && req.body.mobile) {
                                        return cb(this.stringConstant.notEnoughMoney, d, da);
                                    }
                                    var previousAmountMerchant = d[0].amount;
                                    if (type_id === 3) {
                                        // previous amount of merchant
                                        // here we reduce recharege amount acoding the merchant percentage
                                        const sign = app_function_1.AppFucntion.getSignOfNumber(data[0].provider_percentage);
                                        if (sign == -1) {
                                            //        - 448            =   100           *  ((          -450              +                2            ) / 100) but we get -448.00000000000006
                                            const reduceMerchantReload = req.body.amount * ((data[0].provider_percentage + data[0].merchants_percentage) / 100);
                                            if (previousAmountMerchant < -reduceMerchantReload) {
                                                return cb(this.stringConstant.notEnoughMoney, d, da);
                                            }
                                            req.body.currentAmountOfMechant = previousAmountMerchant + reduceMerchantReload;
                                        }
                                        else if (sign == 1) {
                                            //       502                  =      600               - 100((               100 -      2                      ) / 100)
                                            req.body.currentAmountOfMechant = previousAmountMerchant - req.body.amount * ((100 - data[0].merchants_percentage) / 100); // console.log(req.body.currentAmountOfMechant);
                                        }
                                    }
                                    else if (type_id === 5 || type_id === 7) {
                                        // 490                                  600                  -(100                 +12                               -2)
                                        req.body.currentAmountOfMechant = previousAmountMerchant - (req.body.amount + -data[0].provider_percentage - data[0].merchants_percentage);
                                        // console.log(req.body.currentAmountOfMechant);
                                    }
                                    else {
                                        // previous amount of merchant
                                        var previousAmountMerchant = d[0].amount;
                                        // here we reduce recharege amount acoding the merchant percentage
                                        req.body.currentAmountOfMechant = previousAmountMerchant - req.body.amount * ((100 - data[0].merchants_percentage) / 100);
                                    }
                                    // topup merchant query
                                    const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(req.body.currentAmountOfMechant, merchant_id);
                                    // get distibutor by id
                                    const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].distributors_id);
                                    // get distributors by id
                                    return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        // if distributors not available for user id
                                        if (d.length < 1) {
                                            return cb(this.stringConstant.unableGet, d, da);
                                        }
                                        // previous amount of distibutor
                                        var previousAmountDistributor = d[0].amount;
                                        // here we add recharege amount acoding the distributor percentage
                                        if (type_id === 5 || type_id === 7) {
                                            req.body.currentAmountOfDistributor = previousAmountDistributor + data[0].distributor_percentage;
                                        }
                                        else {
                                            req.body.currentAmountOfDistributor = previousAmountDistributor + req.body.amount * (data[0].distributor_percentage / 100);
                                        }
                                        // req.body.currentAmountOfDistributor = previousAmountDistributor + req.body.amount * (data[0].distributor_percentage / 100);
                                        var distibutorId = d[0].distributors_id;
                                        //  add topup to distributor query
                                        const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, distibutorId);
                                        const getAdmin = topup_reload_query_1.TopUpReloadQuery.getAdmin();
                                        // get distributors by id
                                        return connection_1.default.connct(getAdmin, req, (err, d, da) => __awaiter(this, void 0, void 0, function* () {
                                            if (err) {
                                                return cb(err, d, da);
                                            }
                                            var previousAmountAdmin = d[0].amount;
                                            if (type_id === 5 || type_id === 7) {
                                                var currentAmountOfAdmin = previousAmountAdmin + data[0].admin_percentage;
                                            }
                                            else {
                                                var currentAmountOfAdmin = previousAmountAdmin + req.body.amount * (data[0].admin_percentage / 100);
                                                // console.log(currentAmountOfAdmin);
                                            }
                                            const updateAmountToAdmin = topup_reload_query_1.TopUpReloadQuery.updateAmountToAdmin(currentAmountOfAdmin);
                                            try {
                                                // ezlanka recharge api
                                                var ezLankaErrorCode = yield (0, api_1.recharge)(mobile, opcode, amount, reqid);
                                            }
                                            catch (error) {
                                                return cb(this.stringConstant.reloadError, null, da);
                                            }
                                            const reloadStatus = { new: ezLankaErrorCode.status[0], };
                                            // we make array as string
                                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                                            ezLankaErrorCode.reloadStatus = jsonReloadStatus;
                                            // add topup history query
                                            const addReloadHistory = topup_reload_query_1.TopUpReloadQuery.addReloadHistory(merchant_id, req, ezLankaErrorCode, provider_id);
                                            // if this result come from recharge then money will reduce from our walet 1000=success,1018,1010 are pending
                                            if (ezLankaErrorCode.ec[0] === "1000" || ezLankaErrorCode.ec[0] === "1018" || ezLankaErrorCode.ec[0] === "1010") {
                                                // add recharge amount accoding admin service percentage
                                                return connection_1.default.connct(updateAmountToAdmin, req, (err, d, da) => {
                                                    if (err) {
                                                        return cb(err, d, da);
                                                    }
                                                    // add recharge amount accoding distibutor service percentage
                                                    return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                                        if (err) {
                                                            return cb(err, d, da);
                                                        }
                                                        // add topup history
                                                        return connection_1.default.connct(addReloadHistory, req, (err, d, da) => {
                                                            if (err) {
                                                                return cb(err, d, da);
                                                            }
                                                            //reduce recharge amount accoding merchant service percentage
                                                            return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                                                                // if we success
                                                                if (ezLankaErrorCode.ec[0] === "1000") {
                                                                    d = ezLankaErrorCode.reqid;
                                                                    return cb(err, d, da);
                                                                }
                                                                else if (ezLankaErrorCode.ec[0] === "1010" || ezLankaErrorCode.ec[0] === "1018") {
                                                                    // if we got pending
                                                                    // we get request id from ezLankaErrorCode(from recharge api)
                                                                    var reqid = ezLankaErrorCode.reqid[0];
                                                                    console.log(reqid);
                                                                    const getCurrentRechargeStatus = () => __awaiter(this, void 0, void 0, function* () {
                                                                        try {
                                                                            var getRechargeStatus = yield (0, api_1.getStatus)(reqid);
                                                                        }
                                                                        catch (error) {
                                                                            return cb(this.stringConstant.getStatusError, null, da);
                                                                        }
                                                                        // if we success after pending
                                                                        if (getRechargeStatus.ec[0] === "1000") {
                                                                            // create an array
                                                                            const reloadStatus = { old: ezLankaErrorCode.status[0], new: getRechargeStatus.status[0], };
                                                                            // we make array as string
                                                                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                                                                            // update reload history query
                                                                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                                                                            // once we get success we do not need to do set interval ,so we clear interval
                                                                            clearInterval(myInterval);
                                                                            // update reload history
                                                                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                                                                if (err) {
                                                                                    return cb(err, d, da);
                                                                                }
                                                                                d = ezLankaErrorCode.reqid;
                                                                                return cb(getRechargeStatus.remark[0], d, da);
                                                                            });
                                                                        }
                                                                        else if (getRechargeStatus.ec[0] === "1014") {
                                                                            // if we get refund as status
                                                                            // create an array
                                                                            const reloadStatus = { old: ezLankaErrorCode.status[0], new: getRechargeStatus.status[0], };
                                                                            // we make array as string
                                                                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                                                                            // update reload history query
                                                                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                                                                            // once we get success we do not need to do set interval ,so we clear interval
                                                                            clearInterval(myInterval);
                                                                            // update reload history
                                                                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                                                                if (err) {
                                                                                    return cb(err, d, da);
                                                                                }
                                                                                // get merchant details
                                                                                return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                                                                                    if (err) {
                                                                                        return cb(err, d, da);
                                                                                    }
                                                                                    // if mechants not available for user id
                                                                                    if (d.length < 1) {
                                                                                        return cb(this.stringConstant.unableGet, d, da);
                                                                                    }
                                                                                    // we get the current amount of merchant
                                                                                    var currentAmountMerchant = d[0].amount;
                                                                                    // add reload amount  with the current amount because of refund
                                                                                    req.body.currentAmountOfMechant = currentAmountMerchant + req.body.amount * ((100 - data[0].merchants_percentage) / 100);
                                                                                    // topup merchant query
                                                                                    const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(req.body.currentAmountOfMechant, merchant_id);
                                                                                    // get distributors detailsby user id
                                                                                    return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                                                                        if (err) {
                                                                                            return cb(err, d, da);
                                                                                        }
                                                                                        // if distributors not available for user id
                                                                                        if (d.length < 1) {
                                                                                            return cb(this.stringConstant.unableGet, d, da);
                                                                                        }
                                                                                        // current amount of distibutor
                                                                                        var currentAmountDistributor = d[0].amount;
                                                                                        // current amount of distibutor
                                                                                        // we reduce reload commion from distributor amount because of refund
                                                                                        req.body.currentAmountOfDistributor = currentAmountDistributor - req.body.amount * (data[0].distributor_percentage / 100);
                                                                                        // topup query
                                                                                        const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, distibutorId);
                                                                                        const getAdmin = topup_reload_query_1.TopUpReloadQuery.getAdmin();
                                                                                        // get distributors by id
                                                                                        return connection_1.default.connct(getAdmin, req, (err, d, da) => {
                                                                                            if (err) {
                                                                                                return cb(err, d, da);
                                                                                            }
                                                                                            var previousAmountAdmin = d[0].amount;
                                                                                            const currentAmountOfAdmin = previousAmountAdmin - req.body.amount * (data[0].admin_percentage / 100);
                                                                                            const updateAmountToAdmin = topup_reload_query_1.TopUpReloadQuery.updateAmountToAdmin(currentAmountOfAdmin);
                                                                                            //   add topup to merchants
                                                                                            return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                                                                                                if (err) {
                                                                                                    return cb(err, d, da);
                                                                                                }
                                                                                                //   add topup to distributor
                                                                                                return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                                                                                    if (err) {
                                                                                                        return cb(err, d, da);
                                                                                                    }
                                                                                                    //   add topup to distributor
                                                                                                    return connection_1.default.connct(updateAmountToAdmin, req, (err, d, da) => {
                                                                                                        if (err) {
                                                                                                            return cb(err, d, da);
                                                                                                        }
                                                                                                        d = ezLankaErrorCode.reqid;
                                                                                                        return cb(getRechargeStatus.remark[0], d, da);
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        }
                                                                    });
                                                                    // if we get pending result from ezlanka code then we will call getCurrentRechargeStatus to update the new status,this will continue until we get success or refund.for that we use setInterval function
                                                                    var myInterval = setInterval(getCurrentRechargeStatus, 60000);
                                                                }
                                                            });
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                // if we get fail status from ezlanka code it will come in else part
                                                delete req.body.currentAmountOfMechant;
                                                delete req.body.currentAmountOfDistributor;
                                                return cb(ezLankaErrorCode.remark[0], null, req);
                                            }
                                        }));
                                    });
                                });
                            });
                        });
                    }));
                }
            }
        });
    }
    // topup and reload
    topupDistributor(req, cb) {
        // get merchant by user code query
        var getUserIdByUserCode = user_query_1.Query.getUser(req.body.user_code);
        return connection_1.default.connct(getUserIdByUserCode, req, (err, d, da) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return cb(err, d, da);
            }
            // if user not available for user code
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, da);
            }
            // console.log(d[0].is_enabled);
            // console.log(d[0].is_deleted);
            if (d[0].is_enabled === 0) {
                return cb(this.stringConstant.userDisabled, d, da);
            }
            else if (d[0].is_deleted === 1) {
                return cb(this.stringConstant.userDeleted, d, da);
            }
            else {
                try {
                    // find ezLanka balance
                    var getEzLankaBalance = yield (0, api_1.getBalance)();
                    console.log(getEzLankaBalance);
                }
                catch (error) {
                    return cb(this.stringConstant.getStatusError, null, req);
                }
                // var getEzLankaBalance = Number("2043.19");
                //  find total balance of merchant and
                var getTotalProfitOfAdmin = topup_reload_query_1.TopUpReloadQuery.getTotalProfitOfAdmin();
                return connection_1.default.connct(getTotalProfitOfAdmin, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    const totalAdminProfit = d[0].total_amount_of_admin;
                    // console.log(totalAdminProfit);
                    var getTotalAmountOfMerchantDistibutor = topup_reload_query_1.TopUpReloadQuery.getTotalAmountOfMerchantDistibutor();
                    return connection_1.default.connct(getTotalAmountOfMerchantDistibutor, req, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        const totalAmountOfMerchantAndDistibutor = d[0].total_amount;
                        const totalAmount = totalAmountOfMerchantAndDistibutor + totalAdminProfit + req.body.amount;
                        console.log(totalAmount);
                        if (getEzLankaBalance.main >= totalAmount) {
                            // var getadminIdByUserCode: any = TopUpReloadQuery.updateAmountToAdmin(amount);
                            // if the type is 1 then it will be topupb
                            var getadminIdByUserCode = user_query_1.Query.getUser(req.user.id);
                            // get admin id by user code
                            return connection_1.default.connct(getadminIdByUserCode, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                const admin = d[0].id;
                                // get distibuter by user code query
                                var getDistributorsByUserCode = user_query_1.Query.getUser(req.body.user_code);
                                // get user id by user code
                                return connection_1.default.connct(getDistributorsByUserCode, req, (err, d, da) => {
                                    if (err) {
                                        return cb(err, d, da);
                                    }
                                    // if user not available for user code
                                    if (d.length < 1) {
                                        return cb(this.stringConstant.unableGet, d, da);
                                    }
                                    // get distributors by user id query
                                    const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].id);
                                    // get  distributors by user id
                                    return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        // if distributors not available for user id
                                        if (d.length < 1) {
                                            return cb(this.stringConstant.unableGet, d, da);
                                        }
                                        const distributor_id = d[0].distributors_id;
                                        // topup merchans by user id query
                                        const previousAmount = d[0].amount;
                                        req.body.currentAmountOfDistributor =
                                            previousAmount + req.body.amount;
                                        // add topup to distributor query
                                        const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, d[0].distributors_id);
                                        // add topup history
                                        return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                            if (err) {
                                                return cb(err, d, da);
                                            }
                                            // add topup history query
                                            const addDistributorTopUpHistory = topup_reload_query_1.TopUpReloadQuery.addDistributorTopUpHistory(admin, distributor_id, req.body.amount);
                                            // // add topup history
                                            return connection_1.default.connct(addDistributorTopUpHistory, req, (err, d, da) => __awaiter(this, void 0, void 0, function* () {
                                                if (err) {
                                                    return cb(err, d, da);
                                                }
                                                return cb(err, d, da);
                                            }));
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            return cb("not eagugh money", d, da);
                        }
                    });
                });
            }
        }));
    }
    topupHistory(req, cb) {
        const userCode = req.params.code;
        // find merchant details using code query
        const merchant = user_query_1.Query.getUser(userCode);
        // find merchant details using code query
        return connection_1.default.connct(merchant, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            // if user not available for user code
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, da);
            }
            // find topup history by merchant code
            const getMerchantHistory = topup_reload_query_1.TopUpReloadQuery.getMerchantHistory(d[0].id);
            // get user id by user code
            return connection_1.default.connct(getMerchantHistory, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                return cb(err, d, da);
            });
        });
    }
    reloadHistory(req, cb) {
        var disCode = req.params.disCode;
        var merCode = req.params.merCode;
        var pageNumber = req.params.pageNumber;
        const reloadHistoryPageCount = (reloads, reloadHistoryCount) => {
            return connection_1.default.connct(reloadHistoryCount, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                const page_count = d[0].reload_history_count / 100;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                reloads.page_array = page_array;
                return cb(err, reloads, da);
            });
        };
        const reloadSupport = (reloadHistory, reloadHistoryCount, disId) => {
            return connection_1.default.connct(reloadHistory, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                const getDistibutors = user_query_1.Query.getAllDistubuter();
                return connection_1.default.connct(getDistibutors, req, (err, disData, da) => {
                    if (err) {
                        return cb(err, disData, da);
                    }
                    disData.forEach((element) => {
                        delete element.image;
                        delete element.first_name;
                        delete element.last_name;
                        delete element.email;
                        delete element.mobile;
                        delete element.amount;
                        delete element.role_code;
                        delete element.role_name;
                    });
                    if (disId != 0) {
                        const getMerchants = user_query_1.Query.getAllMerchantByDistubuterId(disId);
                        return connection_1.default.connct(getMerchants, req, (err, merData, da) => {
                            if (err) {
                                return cb(err, merData, da);
                            }
                            merData.forEach((element) => {
                                delete element.image;
                                delete element.first_name;
                                delete element.last_name;
                                delete element.email;
                                delete element.mobile;
                                delete element.amount;
                                delete element.role_code;
                                delete element.role_name;
                            });
                            // const reloadHistoryCount = TopUpReloadQuery.reloadHistoryCount();
                            // return Mysql.connct(reloadHistoryCount, req, (err, d, da) => {
                            //   if (err) {
                            //     return cb(err, d, da);
                            //   }
                            //   const page_count = d[0].reload_history_count / 10;
                            //   // we create an array with the initial value 1
                            //   var page_array = [1];
                            //   // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                            //   for (let index = 2; index < page_count + 1; index++) {
                            //     page_array[index - 1] = index;
                            //   }
                            var reloads = {
                                reloads: data,
                                distibutors: disData,
                                merchants: merData,
                            };
                            return reloadHistoryPageCount(reloads, reloadHistoryCount);
                            // return cb(err, reloads, da);
                            // });
                        });
                    }
                    else {
                        var reloads = {
                            reloads: data,
                            distibutors: disData,
                            merchants: {},
                        };
                        return reloadHistoryPageCount(reloads, reloadHistoryCount);
                    }
                });
            });
        };
        if (disCode == 0 && merCode == 0) {
            var reloadHistory = topup_reload_query_1.TopUpReloadQuery.allReloadHistory(pageNumber);
            const reloadHistoryCount = topup_reload_query_1.TopUpReloadQuery.reloadHistoryCount();
            return reloadSupport(reloadHistory, reloadHistoryCount, disCode);
        }
        else if (disCode != 0 && merCode == 0) {
            var distributorCode = user_query_1.Query.getUser(disCode);
            return connection_1.default.connct(distributorCode, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                var disId = data[0].id;
                var reloadHistory = topup_reload_query_1.TopUpReloadQuery.ReloadHistorybByDistributor(disId, pageNumber);
                const reloadHistoryCount = topup_reload_query_1.TopUpReloadQuery.distibutorReloadHistoryCount(disId);
                return reloadSupport(reloadHistory, reloadHistoryCount, disId);
            });
        }
        else if (disCode != 0 && merCode != 0) {
            var distributorCode = user_query_1.Query.getUser(disCode);
            return connection_1.default.connct(distributorCode, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                var merchantCode = user_query_1.Query.getUser(merCode);
                return connection_1.default.connct(merchantCode, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    const disId = data[0].id;
                    const merId = d[0].id;
                    var reloadHistory = topup_reload_query_1.TopUpReloadQuery.reloadHistoryByDistributorMerchant(disId, merId, pageNumber);
                    const reloadHistoryCount = topup_reload_query_1.TopUpReloadQuery.distibutorMerchantReloadHistoryCount(disId, merId);
                    return reloadSupport(reloadHistory, reloadHistoryCount, disId);
                });
            });
        }
    }
    // it is use for reload history
    // public reloadSupport(req: any, cb: any, reloadHistory, disId: any) {
    //   const pageNumber = req.params.page_number;
    //   return Mysql.connct(reloadHistory, req, (err, data, da) => {
    //     if (err) {
    //       return cb(err, data, da);
    //     }
    //     const getDistibutors = Query.getAllDistubuter();
    //     return Mysql.connct(getDistibutors, req, (err, disData, da) => {
    //       if (err) {
    //         return cb(err, disData, da);
    //       }
    //       disData.forEach((element) => {
    //         delete element.image;
    //         delete element.first_name;
    //         delete element.last_name;
    //         delete element.email;
    //         delete element.mobile;
    //         delete element.amount;
    //         delete element.role_code;
    //         delete element.role_name;
    //       });
    //       if (disId != 0) {
    //         const getMerchants = Query.getAllMerchantByDistubuterId(disId);
    //         return Mysql.connct(getMerchants, req, (err, merData, da) => {
    //           if (err) {
    //             return cb(err, merData, da);
    //           }
    //           merData.forEach((element) => {
    //             delete element.image;
    //             delete element.first_name;
    //             delete element.last_name;
    //             delete element.email;
    //             delete element.mobile;
    //             delete element.amount;
    //             delete element.role_code;
    //             delete element.role_name;
    //           });
    //           const reloadHistoryCount = TopUpReloadQuery.reloadHistoryCount();
    //           return Mysql.connct(reloadHistoryCount, req, (err, d, da) => {
    //             if (err) {
    //               return cb(err, d, da);
    //             }
    //             const page_count = d[0].reload_history_count / 10;
    //             // we create an array with the initial value 1
    //             var page_array = [1];
    //             // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
    //             for (let index = 2; index < page_count + 1; index++) {
    //               page_array[index - 1] = index;
    //             }
    //             var reloads = {
    //               page_array: page_array,
    //               reloads: data,
    //               distibutors: disData,
    //               merchants: merData,
    //             };
    //             return cb(err, reloads, da);
    //           });
    //         });
    //       } else {
    //         const reloadHistoryCount = TopUpReloadQuery.reloadHistoryCount();
    //         return Mysql.connct(reloadHistoryCount, req, (err, d, da) => {
    //           if (err) {
    //             return cb(err, d, da);
    //           }
    //           const page_count = d[0].reload_history_count / 10;
    //           // we create an array with the initial value 1
    //           var page_array = [1];
    //           // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
    //           for (let index = 2; index < page_count + 1; index++) {
    //             page_array[index - 1] = index;
    //           }
    //           var reloads = {
    //             page_array: page_array,
    //             reloads: data,
    //             distibutors: disData,
    //             merchants: {},
    //           };
    //           return cb(err, reloads, da);
    //         });
    //       }
    //     });
    //   });
    // }
    reloadHistoryByMobile(req, cb) {
        const mobile = req.params.mobile;
        const disCode = req.params.disCode;
        var pageNumber = req.params.pageNumber;
        const support = (getReloadHistoryByMobile) => {
            // find merchant details using code query
            return connection_1.default.connct(getReloadHistoryByMobile, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                const mobileReloadHistoryCount = topup_reload_query_1.TopUpReloadQuery.mobileReloadHistoryCount(mobile);
                return connection_1.default.connct(mobileReloadHistoryCount, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    const page_count = d[0].reload_history_count / 100;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var reload = { page_array: page_array, reloads: data };
                    return cb(err, reload, da);
                });
            });
        };
        if (disCode !== "0") {
            var getDistributor = user_query_1.Query.getUser(disCode);
            return connection_1.default.connct(getDistributor, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                console.log(data);
                var disId = data[0].id;
                // find merchant details using code query
                const getReloadHistoryByMobile = topup_reload_query_1.TopUpReloadQuery.getDistibutorReloadHistoryByMobile(disId, mobile, pageNumber);
                return support(getReloadHistoryByMobile);
                // find merchant details using code query
                // return Mysql.connct(getReloadHistoryByMobile, req, (err, d, da) => {
                //   if (err) {
                //     return cb(err, d, da);
                //   }
                // // if user not available for user code
                // // if (d.length < 1) {
                // //   return cb(this.stringConstant.unableGet, d, da);
                // // }
                // //       var result=[];
                // //       var i = 0;
                // //       d.forEach((element) => {
                // //         const getDistributorsByUserId: any = Query.getUserByUserId(
                // //           element.distributors_id
                // //         );
                // //          Mysql.connct(getDistributorsByUserId, req, (err, data, da) => {
                // //           if (err) {
                // //             return cb(err, data, da);
                // //           }
                // //           element.distributors_name.push = data[0].name;
                // //           // result.push[i]=element;
                // //           // return cb(err, element, da);
                // // // i++;
                // //         });
                // //       });
                // // find topup history by merchant code
                // // const getDistributorsByUserId: any = Query.getUserByUserId(
                // //   d[0].distributors_id
                // // );
                // // get user id by user code
                // //       return Mysql.connct(getDistributorsByUserId, req, (err, data, da) => {
                // //         if (err) {
                // //           return cb(err, data, da);
                // //         }
                // // const getReloadHistoryByMobile={}
                // return cb(err, d, da);
                // });
            });
        }
        else if (disCode == 0) {
            const getReloadHistoryByMobile = topup_reload_query_1.TopUpReloadQuery.getAdminReloadHistoryByMobile(mobile, pageNumber);
            return support(getReloadHistoryByMobile);
        }
    }
    uploadReloadHistory(req, cb) {
        var host = "google.com";
        var frequency = 1000;
        var i = 0;
        var info;
        const x = function () {
            i++;
            ping.sys.probe(host, function (active) {
                info = active ? 1 : 0;
            });
            if (i > 5 && info === 1) {
                clearInterval(data);
                const getReloadHistoryPendingStatus = topup_reload_query_1.TopUpReloadQuery.getReloadHistoryPendingStatus();
                // return Mysql.connct(
                connection_1.default.connct(getReloadHistoryPendingStatus, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    if (d.length < 1) {
                        return cb("We do not have Pending reload", d, da);
                    }
                    d.map((reloadHistory) => __awaiter(this, void 0, void 0, function* () {
                        var getRechargeStatus = yield (0, api_1.getStatus)(reloadHistory.reqid);
                        if (getRechargeStatus.ec[0] === "1000") {
                            const userObj = JSON.parse(reloadHistory.status);
                            const reloadStatus = {
                                old: userObj.new,
                                new: getRechargeStatus.status[0],
                            };
                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                // return cb(err, d, da);
                            });
                        }
                        else if (getRechargeStatus.ec[0] === "1014") {
                            const userObj = JSON.parse(reloadHistory.status);
                            const reloadStatus = {
                                old: userObj.new,
                                new: getRechargeStatus.status[0],
                            };
                            // const reloadStatus = new Array();
                            // reloadStatus.push(reloadHistory.status); // add at the end
                            // reloadStatus.push(getRechargeStatus.status[0]); // add at the end
                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                // get service by service code query
                                const getServicesPercentageByserviceId = topup_reload_query_1.TopUpReloadQuery.getServicesPercentageByserviceId(reloadHistory.provider_id);
                                // get service by service code
                                return connection_1.default.connct(getServicesPercentageByserviceId, req, (err, data, da) => {
                                    if (err) {
                                        return cb(err, data, da);
                                    }
                                    // if mechants not available for user id
                                    if (data.length < 1) {
                                        return cb("Unable to get data for this user id", d, da);
                                    }
                                    const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(reloadHistory.merchants_id);
                                    // get  merchants by user id
                                    return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        // if mechants not available for user id
                                        if (d.length < 1) {
                                            return cb("Unable to get data for this user id", d, da);
                                        }
                                        req.distributor_id = d[0].distributors_id;
                                        var previousAmountMerchant = d[0].amount;
                                        req.body.currentAmountOfMechant =
                                            previousAmountMerchant +
                                                reloadHistory.amount *
                                                    ((100 - data[0].merchants_percentage) / 100);
                                        const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(req.body.currentAmountOfMechant, reloadHistory.merchants_id);
                                        // add topup history query
                                        // const addReloadHistory: any = TopUpReloadQuery.addReloadHistory(
                                        //   req,
                                        //   ezLankaErrorCode
                                        // );
                                        const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].distributors_id);
                                        // get distributors by user id
                                        return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                            if (err) {
                                                return cb(err, d, da);
                                            }
                                            // if distributors not available for user id
                                            if (d.length < 1) {
                                                return cb("Unable to get data for this user id", d, da);
                                            }
                                            var previousAmountDistributor = d[0].amount;
                                            req.body.currentAmountOfDistributor =
                                                previousAmountDistributor -
                                                    reloadHistory.amount *
                                                        (data[0].distributor_percentage / 100);
                                            var distibutorId = d[0].distributors_id;
                                            //  add topup to distributor query
                                            const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, distibutorId);
                                            return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                                if (err) {
                                                    return cb(err, d, da);
                                                }
                                                //   add topup to merchants
                                                return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                                                    if (err) {
                                                        return cb(err, d, da);
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                                // return cb(err, d, da);
                            });
                        }
                    }));
                    return cb(err, null, da);
                });
            }
        };
        var data = setInterval(x, frequency);
    }
    ping(req, cb) {
        var host = "google.com";
        var frequency = 1000;
        var i = 0;
        var info;
        const x = function () {
            i++;
            ping.sys.probe(host, function (active) {
                info = active ? 1 : 0;
            });
            if (i > 5 && info === 1) {
                clearInterval(data);
                const getReloadHistoryPendingStatus = topup_reload_query_1.TopUpReloadQuery.getReloadHistoryPendingStatus();
                // return Mysql.connct(
                connection_1.default.connct(getReloadHistoryPendingStatus, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    if (d.length < 1) {
                        return cb("We do not have Pending reload", d, da);
                    }
                    d.map((reloadHistory) => __awaiter(this, void 0, void 0, function* () {
                        var getRechargeStatus = yield (0, api_1.getStatus)(reloadHistory.reqid);
                        if (getRechargeStatus.ec[0] === "1000") {
                            const userObj = JSON.parse(reloadHistory.status);
                            const reloadStatus = {
                                old: userObj.new,
                                new: getRechargeStatus.status[0],
                            };
                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                // return cb(err, d, da);
                            });
                        }
                        else if (getRechargeStatus.ec[0] === "1014") {
                            const userObj = JSON.parse(reloadHistory.status);
                            const reloadStatus = {
                                old: userObj.new,
                                new: getRechargeStatus.status[0],
                            };
                            // const reloadStatus = new Array();
                            // reloadStatus.push(reloadHistory.status); // add at the end
                            // reloadStatus.push(getRechargeStatus.status[0]); // add at the end
                            const jsonReloadStatus = JSON.stringify(reloadStatus);
                            const updateReloadHistoryStatus = topup_reload_query_1.TopUpReloadQuery.updateReloadHistoryStatus(getRechargeStatus, jsonReloadStatus);
                            return connection_1.default.connct(updateReloadHistoryStatus, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                // get service by service code query
                                const getServicesPercentageByserviceId = topup_reload_query_1.TopUpReloadQuery.getServicesPercentageByserviceId(reloadHistory.provider_id);
                                // get service by service code
                                return connection_1.default.connct(getServicesPercentageByserviceId, req, (err, data, da) => {
                                    if (err) {
                                        return cb(err, data, da);
                                    }
                                    // if mechants not available for user id
                                    if (data.length < 1) {
                                        return cb("Unable to get data for this user id", d, da);
                                    }
                                    const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(reloadHistory.merchants_id);
                                    // get  merchants by user id
                                    return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da);
                                        }
                                        // if mechants not available for user id
                                        if (d.length < 1) {
                                            return cb("Unable to get data for this user id", d, da);
                                        }
                                        req.distributor_id = d[0].distributors_id;
                                        var previousAmountMerchant = d[0].amount;
                                        req.body.currentAmountOfMechant =
                                            previousAmountMerchant +
                                                reloadHistory.amount *
                                                    ((100 - data[0].merchants_percentage) / 100);
                                        const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(req.body.currentAmountOfMechant, reloadHistory.merchants_id);
                                        // add topup history query
                                        // const addReloadHistory: any = TopUpReloadQuery.addReloadHistory(
                                        //   req,
                                        //   ezLankaErrorCode
                                        // );
                                        const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].distributors_id);
                                        // get distributors by user id
                                        return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                                            if (err) {
                                                return cb(err, d, da);
                                            }
                                            // if distributors not available for user id
                                            if (d.length < 1) {
                                                return cb("Unable to get data for this user id", d, da);
                                            }
                                            var previousAmountDistributor = d[0].amount;
                                            req.body.currentAmountOfDistributor =
                                                previousAmountDistributor -
                                                    reloadHistory.amount *
                                                        (data[0].distributor_percentage / 100);
                                            var distibutorId = d[0].distributors_id;
                                            //  add topup to distributor query
                                            const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(req.body.currentAmountOfDistributor, distibutorId);
                                            return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                                if (err) {
                                                    return cb(err, d, da);
                                                }
                                                //   add topup to merchants
                                                return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                                                    if (err) {
                                                        return cb(err, d, da);
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                                // return cb(err, d, da);
                            });
                        }
                    }));
                    return cb(err, null, da);
                });
            }
        };
        var data = setInterval(x, frequency);
    }
    reloadHistoryByReqid(req, cb) {
        const reqid = req.params.reqid;
        const disCode = req.params.disCode;
        const support = (getReloadHistoryByReqid) => {
            // find merchant details using code query
            return connection_1.default.connct(getReloadHistoryByReqid, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                // if user not available for user code
                // if (d.length < 1) {
                //   return cb(this.stringConstant.unableGet, d, da);
                // }
                return cb(err, d, da);
            });
        };
        if (disCode !== "0") {
            var getDistributor = user_query_1.Query.getUser(disCode);
            return connection_1.default.connct(getDistributor, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                var disId = data[0].id;
                // find merchant details using code query
                // find merchant details using code query
                const getReloadHistoryByReqid = topup_reload_query_1.TopUpReloadQuery.getDistibutorReloadHistoryByReqid(disId, reqid);
                console.log(getReloadHistoryByReqid);
                return support(getReloadHistoryByReqid);
            });
        }
        else if (disCode == 0) {
            const getReloadHistoryByMobile = topup_reload_query_1.TopUpReloadQuery.getAdminReloadHistoryByReqid(reqid);
            return support(getReloadHistoryByMobile);
        }
    }
    // public reloadHistoryBydate(req: any, cb: any) {
    //   const s_date = req.params.s_date;
    //   const e_date = req.params.e_date;
    //   if (s_date!=="0" && e_date === "0") {
    //     console.log('1730');
    //     var getReloadHistoryBySdate =
    //       TopUpReloadQuery.getReloadHistoryBySdate(s_date);
    //   } else if (s_date !=="0" && e_date !== "0") {
    //     console.log('17355');
    //     var getReloadHistoryBySdate =
    //       TopUpReloadQuery.getReloadHistoryBySdateAndEnddate(s_date, e_date);
    //   }else{
    //               return cb(this.stringConstant.enterCorrectDate, req, null);
    //   }
    //   // find merchant details using code query
    //   // const getReloadHistoryBySdateAndEnddate = TopUpReloadQuery.getReloadHistoryBySdateAndEnddate(s_date,e_date);
    //   // find merchant details using code query
    //   return Mysql.connct(getReloadHistoryBySdate, req, (err, d, da) => {
    //     if (err) {
    //       return cb(err, d, da);
    //     }
    //     // // if user not available for user code
    //     // if (d.length < 1) {
    //     //   return cb(this.stringConstant.unableGet, d, da);
    //     // }
    //     return cb(err, d, da);
    //   });
    // }
    reloadHistoryBydate(req, cb) {
        const s_date = req.params.s_date;
        const e_date = req.params.e_date;
        const disCode = req.params.dis_code;
        const pageNumber = req.params.page_number;
        const support = (getReloadHistoryBySdate, getReloadHistoryCountBySdate) => {
            // find merchant details using code query
            return connection_1.default.connct(getReloadHistoryBySdate, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                return connection_1.default.connct(getReloadHistoryCountBySdate, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    const page_count = d[0].reload_history_count / 100;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var reload = { page_array: page_array, reloads: data };
                    return cb(err, reload, da);
                });
            });
        };
        if (disCode !== "0") {
            var getDistributor = user_query_1.Query.getUser(disCode);
            return connection_1.default.connct(getDistributor, req, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                var disId = data[0].id;
                // find merchant details using code query
                if (s_date !== "0" && e_date === "0") {
                    var getReloadHistoryBySdate = topup_reload_query_1.TopUpReloadQuery.getDistibutorReloadHistoryBySdate(disId, s_date, pageNumber);
                    var getReloadHistoryCountBySdate = topup_reload_query_1.TopUpReloadQuery.distibutorStartDateReloadHistoryCount(disId, s_date);
                }
                else if (s_date !== "0" && e_date !== "0") {
                    var getReloadHistoryBySdate = topup_reload_query_1.TopUpReloadQuery.getDistibutorReloadHistoryBySdateAndEnddate(disId, s_date, e_date, pageNumber);
                    var getReloadHistoryCountBySdate = topup_reload_query_1.TopUpReloadQuery.distibutorStartAndEndDateReloadHistoryCount(disId, s_date, e_date);
                }
                else {
                    req.body = [];
                    return cb(this.stringConstant.enterCorrectDate, null, req);
                }
                return support(getReloadHistoryBySdate, getReloadHistoryCountBySdate);
            });
        }
        else if (disCode == "0") {
            // find merchant details using code query
            if (s_date !== "0" && e_date === "0") {
                var getReloadHistoryBySdate = topup_reload_query_1.TopUpReloadQuery.getAdminReloadHistoryBySdate(s_date, pageNumber);
                var getReloadHistoryCountBySdate = topup_reload_query_1.TopUpReloadQuery.startDateReloadHistoryCount(s_date);
            }
            else if (s_date !== "0" && e_date !== "0") {
                var getReloadHistoryBySdate = topup_reload_query_1.TopUpReloadQuery.getAdminReloadHistoryBySdateAndEnddate(s_date, e_date, pageNumber);
                var getReloadHistoryCountBySdate = topup_reload_query_1.TopUpReloadQuery.startAndEndDateReloadHistoryCount(s_date, e_date);
            }
            else {
                req.body = [];
                return cb(this.stringConstant.enterCorrectDate, null, req);
            }
            return support(getReloadHistoryBySdate, getReloadHistoryCountBySdate);
        }
    }
    adminBalance(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // find ezLanka balance
                var getEzLankaBalance = yield (0, api_1.getBalance)();
            }
            catch (error) {
                return cb(this.stringConstant.getStatusError, null, req);
            }
            var getTotalAmountOfMerchantDistibutor = topup_reload_query_1.TopUpReloadQuery.getTotalAmountOfMerchantDistibutor();
            return connection_1.default.connct(getTotalAmountOfMerchantDistibutor, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                const balanceOfAdmin = getEzLankaBalance.main - d[0].total_amount;
                const balanceOfAdminData = { adminBalance: balanceOfAdmin };
                return cb(err, balanceOfAdminData, da);
            });
        });
    }
    distibutorBalance(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const dis_code = req.params.dis_code;
            var getUserIdByUserCode = user_query_1.Query.getUser(dis_code);
            return connection_1.default.connct(getUserIdByUserCode, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                var getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(d[0].id);
                return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    const balanceOfDistibutor = d[0].amount;
                    const balanceOfDistibutorData = {
                        distibutorsBalance: balanceOfDistibutor,
                    };
                    return cb(err, balanceOfDistibutorData, da);
                });
            });
        });
    }
    // var getTotalProfitOfAdmin: any = TopUpReloadQuery.getTotalProfitOfAdmin();
    // return Mysql.connct(getTotalProfitOfAdmin, req, (err, d, da) => {
    //   if (err) {
    //     return cb(err, d, da);
    //   }
    //   const totalAdminProfit=d[0].total_amount_of_admin;
    //   console.log(totalAdminProfit);
    getMoneyFromMerchant(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.params.code);
            // console.log(req.body.amount);
            const mer_code = req.params.code;
            const getMerchantDistibutorByMerchantCode = topup_reload_query_1.TopUpReloadQuery.getMerchantDistibutorByMerchantCode(mer_code);
            // var getUserIdByUserCode: any = Query.getUser(dis_code);
            // console.log(getMerchantDistibutorByMerchantCode);
            return connection_1.default.connct(getMerchantDistibutorByMerchantCode, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                // if user not available for user code
                if (d.length < 1) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                const merchant_id = d[0].merchants_id;
                const distibutor_id = d[0].distributors_id;
                const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(merchant_id);
                const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(distibutor_id);
                const moneyTakeFromMerchant = req.body.amount;
                return connection_1.default.connct(getMerchansByUserId, req, (err, d, da) => {
                    if (err) {
                        return cb(err, d, da);
                    }
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, da);
                    }
                    // previous amount of distributor
                    const previousAmountOfMerchant = d[0].amount;
                    if (previousAmountOfMerchant < moneyTakeFromMerchant) {
                        return cb(this.stringConstant.merchantDonotHaveEnaughMoney, d, da);
                    }
                    const currentAmountOfMerchant = previousAmountOfMerchant - moneyTakeFromMerchant;
                    const topupMechant = topup_reload_query_1.TopUpReloadQuery.topupMechant(currentAmountOfMerchant, merchant_id);
                    // console.log(topupMechant);
                    return connection_1.default.connct(topupMechant, req, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        return connection_1.default.connct(getDistributorsByUserId, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da);
                            }
                            // previous amount of distributor
                            const previousAmountOfDistibutor = d[0].amount;
                            const currentAmountOfDistibutor = previousAmountOfDistibutor + moneyTakeFromMerchant;
                            const topupDistributor = topup_reload_query_1.TopUpReloadQuery.topupDistributor(currentAmountOfDistibutor, distibutor_id);
                            // console.log(topupDistributor);
                            return connection_1.default.connct(topupDistributor, req, (err, d, da) => {
                                if (err) {
                                    return cb(err, d, da);
                                }
                                return cb(err, d, da);
                            });
                        });
                    });
                });
            });
        });
    }
    adminTopupHistory(req, cb) {
        var disCode = req.params.disCode;
        const pageNumber = req.params.page_number;
        // we have to modify
        const getDistibutors = user_query_1.Query.getAllDistubuter();
        return connection_1.default.connct(getDistibutors, req, (err, allDisData, da) => {
            if (err) {
                return cb(err, allDisData, da);
            }
            allDisData.forEach((element) => {
                delete element.image;
                delete element.first_name;
                delete element.last_name;
                delete element.email;
                delete element.mobile;
                delete element.amount;
                delete element.role_code;
                delete element.role_name;
            });
            if (disCode !== "0") {
                var distributorCode = user_query_1.Query.getUser(disCode);
                return connection_1.default.connct(distributorCode, req, (err, data, da) => {
                    if (err) {
                        return cb(err, data, da);
                    }
                    if (data.length < 1) {
                        return cb(this.stringConstant.unableGet, data, da);
                    }
                    var disId = data[0].id;
                    var adminTopupHistorybByDistributorId = topup_reload_query_1.TopUpReloadQuery.adminTopupHistorybByDistributorId(disId, pageNumber);
                    return connection_1.default.connct(adminTopupHistorybByDistributorId, req, (err, disData, da) => {
                        if (err) {
                            return cb(err, disData, da);
                        }
                        var adminTopupHistoryCountByDistibutor = topup_reload_query_1.TopUpReloadQuery.adminTopupHistoryCountByDistibutor(disId);
                        return connection_1.default.connct(adminTopupHistoryCountByDistibutor, req, (err, count, da) => {
                            if (err) {
                                return cb(err, count, da);
                            }
                            const page_count = count[0].admin_topup_count / 100;
                            console.log(count[0].admin_topup_count);
                            // we create an array with the initial value 1
                            var page_array = [1];
                            // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                            for (let index = 2; index < page_count + 1; index++) {
                                page_array[index - 1] = index;
                            }
                            var topup = {
                                page_array: page_array,
                                topup: disData,
                                distibutors: allDisData,
                            };
                            return cb(err, topup, da);
                        });
                    });
                });
            }
            else if (disCode == 0) {
                var adminTopupHistory = topup_reload_query_1.TopUpReloadQuery.adminTopupHistory(pageNumber);
                return connection_1.default.connct(adminTopupHistory, req, (err, disData, da) => {
                    if (err) {
                        return cb(err, disData, da);
                    }
                    var adminTopupHistoryCount = topup_reload_query_1.TopUpReloadQuery.adminTopupHistoryCount();
                    return connection_1.default.connct(adminTopupHistoryCount, req, (err, count, da) => {
                        if (err) {
                            return cb(err, count, da);
                        }
                        const page_count = count[0].admin_topup_count / 100;
                        // we create an array with the initial value 1
                        var page_array = [1];
                        // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                        for (let index = 2; index < page_count + 1; index++) {
                            page_array[index - 1] = index;
                        }
                        var topup = {
                            page_array: page_array,
                            topup: disData,
                            distibutors: allDisData,
                        };
                        return cb(err, topup, da);
                    });
                });
            }
        });
    }
    adminTopupHistoryBydate(req, cb) {
        const s_date = req.params.s_date;
        const e_date = req.params.e_date;
        const page_number = req.params.page_number;
        if (s_date !== "0" && e_date === "0") {
            var getAdminTopupHistoryBydate = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryBySdate(s_date, page_number);
            var getAdminTopupHistoryByDateCount = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryBySdateCount(s_date);
        }
        else if (s_date !== "0" && e_date !== "0") {
            var getAdminTopupHistoryBydate = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryBySdateAndEnddate(s_date, e_date, page_number);
            var getAdminTopupHistoryByDateCount = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryBySdateAndEnddateCount(s_date, e_date);
        }
        // find merchant details using code query
        // const getReloadHistoryBySdateAndEnddate = TopUpReloadQuery.getReloadHistoryBySdateAndEnddate(s_date,e_date);
        // find merchant details using code query
        return connection_1.default.connct(getAdminTopupHistoryBydate, req, (err, topup_data, da) => {
            if (err) {
                return cb(err, topup_data, da);
            }
            return connection_1.default.connct(getAdminTopupHistoryByDateCount, req, (err, count, da) => {
                if (err) {
                    return cb(err, count, da);
                }
                const page_count = count[0].admiTopupHistoryByDateCount / 100;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                const topup = { page_array: page_array, topup: topup_data };
                return cb(err, topup, da);
            });
        });
    }
    adminTopupHistoryByMobile(req, cb) {
        const mobile = req.params.mobile;
        const page_number = req.params.page_number;
        // find merchant details using code query
        const getAdminTopupHistoryByMobile = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryByMobile(mobile, page_number);
        const getAdminTopupHistoryByMobileCount = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryByMobileCount(mobile);
        // find merchant details using code query
        return connection_1.default.connct(getAdminTopupHistoryByMobile, req, (err, topupData, da) => {
            if (err) {
                return cb(err, topupData, da);
            }
            return connection_1.default.connct(getAdminTopupHistoryByMobileCount, req, (err, count, da) => {
                if (err) {
                    return cb(err, count, da);
                }
                const page_count = count[0].topupHistoryByMobileCount / 100;
                console.log(count[0].topupHistoryByMobileCount);
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                const topup = { page_array: page_array, topup: topupData };
                return cb(err, topup, da);
            });
        });
    }
    adminTopupHistoryByEmail(req, cb) {
        const email = req.params.email;
        const page_number = req.params.page_number;
        // find merchant details using code query
        const getAdminTopupHistoryByEmail = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryByEmail(email, page_number);
        const getAdminTopupHistoryByEmailCount = topup_reload_query_1.TopUpReloadQuery.getAdminTopupHistoryByEmailCount(email);
        // find merchant details using code query
        return connection_1.default.connct(getAdminTopupHistoryByEmail, req, (err, topupData, da) => {
            if (err) {
                return cb(err, topupData, da);
            }
            return connection_1.default.connct(getAdminTopupHistoryByEmailCount, req, (err, count, da) => {
                if (err) {
                    return cb(err, count, da);
                }
                const page_count = count[0].topupHistoryByEmailCount / 100;
                console.log(count[0].topupHistoryByEmailCount);
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                const topup = { page_array: page_array, topup: topupData };
                return cb(err, topup, da);
            });
        });
    }
    distibutorTopupHistory(req, cb) {
        var merCode = req.body.merCode;
        const disCode = req.user.id;
        const page_number = req.params.page_number;
        var getDistributor = user_query_1.Query.getUser(disCode);
        const support = (topup_data, distibutorTopupHistoryCount) => {
            return connection_1.default.connct(distibutorTopupHistoryCount, req, (err, count, da) => {
                if (err) {
                    return cb(err, count, da);
                }
                const page_count = count[0].distibutorTopupHistoryCount / 100;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var topupHistory = { page_array: page_array, topup: topup_data };
                return cb(err, topupHistory, da);
            });
        };
        return connection_1.default.connct(getDistributor, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            var disId = data[0].id;
            const getDistibutors = user_query_1.Query.getAllMerchantByDistubuterId(disId);
            return connection_1.default.connct(getDistibutors, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                d.forEach((element) => {
                    delete element.image;
                    delete element.first_name;
                    delete element.last_name;
                    delete element.email;
                    delete element.mobile;
                    delete element.amount;
                    delete element.role_code;
                    delete element.role_name;
                });
                const merchant = d;
                if (merCode) {
                    var getMerchant = user_query_1.Query.getUser(merCode);
                    return connection_1.default.connct(getMerchant, req, (err, data, da) => {
                        if (err) {
                            return cb(err, data, da);
                        }
                        if (data.length < 1) {
                            return cb(this.stringConstant.unableGet, data, da);
                        }
                        var merId = data[0].id;
                        var distibutorTopupHistoryByMerchantId = topup_reload_query_1.TopUpReloadQuery.distibutorTopupHistoryByMerchantId(disId, merId, page_number);
                        return connection_1.default.connct(distibutorTopupHistoryByMerchantId, req, (err, topUpData, da) => {
                            if (err) {
                                return cb(err, topUpData, da);
                            }
                            var distibutorTopupHistoryByMerchantIdCount = topup_reload_query_1.TopUpReloadQuery.distibutorTopupHistoryByMerchantIdCount(disId, merId);
                            return support(topUpData, distibutorTopupHistoryByMerchantIdCount);
                        });
                    });
                }
                else {
                    var distibutorTopupHistory = topup_reload_query_1.TopUpReloadQuery.distibutorTopupHistory(disId, page_number);
                    return connection_1.default.connct(distibutorTopupHistory, req, (err, disData, da) => {
                        if (err) {
                            return cb(err, disData, da);
                        }
                        var distibutorTopupHistoryCount = topup_reload_query_1.TopUpReloadQuery.distibutorTopupHistoryCount(disId);
                        return support(disData, distibutorTopupHistoryCount);
                    });
                }
            });
        });
    }
    distibutorTopupHistoryBydate(req, cb) {
        const s_date = req.params.s_date;
        const e_date = req.params.e_date;
        const disCode = req.user.id;
        const page_number = req.params.page_number;
        var getDistributor = user_query_1.Query.getUser(disCode);
        return connection_1.default.connct(getDistributor, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            var disId = data[0].id;
            if (s_date !== "0" && e_date === "0") {
                var getDistibutorTopupHistoryBydate = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryBySdate(disId, s_date, page_number);
                var getDistibutorTopupHistoryBydateCount = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryBySdateCount(disId, s_date);
            }
            else if (s_date !== "0" && e_date !== "0") {
                var getDistibutorTopupHistoryBydate = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryBySdateAndEnddate(disId, s_date, e_date, page_number);
                var getDistibutorTopupHistoryBydateCount = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryBySdateAndEnddateCount(disId, s_date, e_date);
            }
            // find merchant details using code query
            return connection_1.default.connct(getDistibutorTopupHistoryBydate, req, (err, topUpData, da) => {
                if (err) {
                    return cb(err, topUpData, da);
                }
                return connection_1.default.connct(getDistibutorTopupHistoryBydateCount, req, (err, count, da) => {
                    if (err) {
                        return cb(err, count, da);
                    }
                    const page_count = count[0].distibutorTopupHistoryByDateCount / 100;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var topupHistory = { page_array: page_array, topup: topUpData };
                    return cb(err, topupHistory, da);
                });
            });
        });
    }
    distibutorTopupHistoryByMobile(req, cb) {
        const mobile = req.params.mobile;
        const disCode = req.user.id;
        const page_number = req.params.page_number;
        var getDistributor = user_query_1.Query.getUser(disCode);
        return connection_1.default.connct(getDistributor, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            var disId = data[0].id;
            // find merchant details using code query
            const getDistibutorTopupHistoryByMobile = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryByMobile(disId, mobile, page_number);
            // find merchant details using code query
            return connection_1.default.connct(getDistibutorTopupHistoryByMobile, req, (err, topUpData, da) => {
                if (err) {
                    return cb(err, topUpData, da);
                }
                var getDistibutorTopupHistoryByMobileCount = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryByMobileCount(disId, mobile);
                return connection_1.default.connct(getDistibutorTopupHistoryByMobileCount, req, (err, count, da) => {
                    if (err) {
                        return cb(err, count, da);
                    }
                    const page_count = count[0].distibutorTopupHistoryCount / 100;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var topupHistory = { page_array: page_array, topup: topUpData };
                    return cb(err, topupHistory, da);
                });
            });
        });
    }
    distibutorTopupHistoryByEmail(req, cb) {
        const email = req.params.email;
        const disCode = req.user.id;
        const page_number = req.params.page_number;
        var getDistributor = user_query_1.Query.getUser(disCode);
        return connection_1.default.connct(getDistributor, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            var disId = data[0].id;
            // find merchant details using code query
            const getDistibutorTopupHistoryByEmail = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryByEmail(disId, email, page_number);
            // find merchant details using code query
            return connection_1.default.connct(getDistibutorTopupHistoryByEmail, req, (err, topup_data, da) => {
                if (err) {
                    return cb(err, topup_data, da);
                }
                const getDistibutorTopupHistoryByEmailCount = topup_reload_query_1.TopUpReloadQuery.getDistibutorTopupHistoryByEmailCount(disId, email);
                return connection_1.default.connct(getDistibutorTopupHistoryByEmailCount, req, (err, count, da) => {
                    if (err) {
                        return cb(err, count, da);
                    }
                    const page_count = count[0].distibutorTopupHistoryEmailCount / 100;
                    // we create an array with the initial value 1
                    var page_array = [1];
                    // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                    for (let index = 2; index < page_count + 1; index++) {
                        page_array[index - 1] = index;
                    }
                    var topupHistory = { page_array: page_array, topup: topup_data };
                    return cb(err, topupHistory, da);
                });
            });
        });
    }
}
exports.TopupReload = TopupReload;
