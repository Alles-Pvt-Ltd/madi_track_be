"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const controller_1 = require("./controller");
const jwt_1 = require("../../core/jwt");
// import { Validation } from "./class";
class DashboardRoutes {
    constructor() {
        this.dashboardCtlr = new controller_1.DashboardController();
    }
    route(app, url) {
        app.get(url + "/list/:divisionId", jwt_1.JwtToken.verify, (req, res) => {
            this.dashboardCtlr.dashboardList(req, res);
        });
        app.get(url + "/info", jwt_1.JwtToken.verify, (req, res) => {
            this.dashboardCtlr.webDashboardList(req, res);
        });
        app.get(url + "/graph", jwt_1.JwtToken.verify, (req, res) => {
            this.dashboardCtlr.dashboardInfo(req, res);
        });
        // app.post(url + "/deploy", (req: Request, res: Response) => {
        //   this.dashboardCtlr.deployment(req, res);
        // });
    }
}
exports.DashboardRoutes = DashboardRoutes;
