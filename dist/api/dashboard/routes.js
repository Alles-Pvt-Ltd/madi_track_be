"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const controller_1 = require("./controller");
const verify_token_1 = require("../../app/verify_token");
class DashboardRoutes {
    constructor() {
        this.dashboardController = new controller_1.DashboardController();
        this.verify = new verify_token_1.Verify();
    }
    route(app, url) {
        //Get dashbord data
        app.get(url + '/:gsDivisionId', this.verify.verify, (req, res) => {
            this.dashboardController.dashboardList(req, res);
        });
    }
}
exports.DashboardRoutes = DashboardRoutes;
