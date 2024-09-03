"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const connection_1 = require("../../mysql/connection");
const services_query_1 = require("../services/services_query");
const user_query_1 = require("../../../database/mysql/users/user_query");
const topup_reload_query_1 = require("../../../database/mysql/topup_reload/topup_reload_query");
const constant_1 = require("../../../config/constant");
const services_1 = require("../services/services");
const dashboard_query_1 = require("./dashboard_query");
class Dashboard {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
        this.services = new services_1.Services();
    }
    getDashboard(req, cb) {
        var serviceWithUser = {};
        // get all services query
        const getAllServices = services_query_1.ServiceQuery.getAllServices();
        // get all services
        return connection_1.default.connct(getAllServices, null, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            // assign service details into serviceWithUser json
            serviceWithUser.services = d;
            // get creater from user code
            const getCreator = user_query_1.Query.getCreator(req.user.id);
            // get all services
            return connection_1.default.connct(getCreator, null, (err, data, da) => {
                if (err) {
                    return cb(err, data, da);
                }
                // if user not available for user code
                if (data.length < 1) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                if (data[0].role_id != 3 && data[0].role_id != 4) {
                    // console.log(data[0].role_id);
                    return cb(this.stringConstant.notAccess, d, da);
                }
                else if (data[0].role_id == 3) {
                    // for distibuter
                    // find distibuter by user id query
                    const getDistributorsByUserId = topup_reload_query_1.TopUpReloadQuery.getDistributorsByUserId(data[0].id);
                    // find distibuter by user id
                    return connection_1.default.connct(getDistributorsByUserId, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        // if user not available for user code
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, da);
                        }
                        var distibuter = {};
                        distibuter.name = data[0].name;
                        distibuter.image = data[0].image;
                        distibuter.amount = d[0].amount;
                        distibuter.updated_date = d[0].updated_date;
                        // assign distibuter details into serviceWithUser
                        serviceWithUser.user = distibuter;
                        // get merchants by using distibuter query
                        const getmerchantsForDistibuter = dashboard_query_1.DashboardQuery.getmerchantsForDistibuter(d[0].distributors_id);
                        // get merchants by using distibuter
                        return connection_1.default.connct(getmerchantsForDistibuter, null, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            // console.log(d[0]);
                            // // if user not available for distibuter
                            // if (d.length < 1) {
                            //   return cb(this.stringConstant.unableGet, d, da);
                            // }
                            // assign merchants details into serviceWithUser
                            serviceWithUser.merchants = d;
                            return cb(err, serviceWithUser, da);
                        });
                    });
                }
                else if (data[0].role_id == 4) {
                    // for distibuter
                    const getMerchansByUserId = topup_reload_query_1.TopUpReloadQuery.getMerchansByUserId(data[0].id);
                    return connection_1.default.connct(getMerchansByUserId, null, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da);
                        }
                        // if user not available for user code
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, da);
                        }
                        var merchant = {};
                        merchant.name = data[0].name;
                        merchant.image = data[0].image;
                        merchant.amount = d[0].amount;
                        merchant.updated_date = d[0].updated_date;
                        serviceWithUser.user = merchant;
                        return cb(err, serviceWithUser, da);
                    });
                }
            });
        });
    }
}
exports.Dashboard = Dashboard;
