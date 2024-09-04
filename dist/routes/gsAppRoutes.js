"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsAppRoutes = void 0;
const routes_1 = require("../api/mysql_api/user/routes");
const constant_1 = require("../config/constant");
const verify_token_1 = require("../app/verify_token");
const routes_2 = require("../api/mysql_api/family/routes");
const routes_3 = require("../api/mysql_api/dashboard/routes");
const routes_4 = require("../api/mysql_api/admin/routes");
class GsAppRoutes {
    // add every root here
    constructor(app) {
        this.userRoutes = new routes_1.UserRoutes();
        this.familyRoutes = new routes_2.FamilyRoutes();
        this.dashboardRoutes = new routes_3.DashboardRoutes();
        this.adminRoutes = new routes_4.AdminRoutes();
        this.verify = new verify_token_1.Verify();
        this.appConstant = new constant_1.default();
        this.userRoutes.route(app, this.appConstant.baseURL + '/user');
        this.familyRoutes.route(app, this.appConstant.baseURL + '/family');
        this.dashboardRoutes.route(app, this.appConstant.baseURL + '/dashboard');
        this.adminRoutes.route(app, this.appConstant.baseURL + '/admin');
        app.all('*', function (req, res) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}
exports.GsAppRoutes = GsAppRoutes;
