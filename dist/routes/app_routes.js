"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const routes_1 = require("../api/user/routes");
const routes_2 = require("../api/type_providers/routes");
const routes_3 = require("../api/services/routes");
const routes_4 = require("../api/topup_reload/routes");
const routes_5 = require("../api/dashboard/routes");
const routes_6 = require("../api/roles/routes");
const routes_7 = require("../api/ez_lanka/routes");
const routes_8 = require("../api/service_type/routes");
const constant_1 = require("../config/constant");
class AppRoutes {
    // add every root here
    constructor(app) {
        //its from ..api/user
        this.userRoutes = new routes_1.UserRoutes();
        this.providerRoutes = new routes_2.ProviderRoutes();
        this.servicesRoutes = new routes_3.ServicesRoutes();
        this.topupReloadRoutes = new routes_4.TopupReloadRoutes();
        this.dashboardRoutes = new routes_5.DashboardRoutes();
        this.rolesRoutes = new routes_6.RolesRoutes();
        this.ez_lankaRoutes = new routes_7.Ez_lankaRoutes();
        this.typeRoutes = new routes_8.TypeRoutes();
        this.appConstant = new constant_1.default();
        this.userRoutes.route(app, this.appConstant.baseURL + '/users');
        this.providerRoutes.route(app, this.appConstant.baseURL + '/type-providers');
        this.servicesRoutes.route(app, this.appConstant.baseURL + '/services');
        this.topupReloadRoutes.route(app, this.appConstant.baseURL + '/topups-reloads');
        this.dashboardRoutes.route(app, this.appConstant.baseURL + '/dashboard');
        this.rolesRoutes.route(app, this.appConstant.baseURL + '/roles');
        this.ez_lankaRoutes.route(app, this.appConstant.baseURL + '/ez_lanka');
        this.typeRoutes.route(app, this.appConstant.baseURL + '/service-type');
    }
}
exports.AppRoutes = AppRoutes;
