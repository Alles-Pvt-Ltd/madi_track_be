"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const routes_1 = require("../api/gs/routes");
const routes_2 = require("../api/gs_division/routes");
const constant_1 = require("../config/constant");
const verify_token_1 = require("../app/verify_token");
class AppRoutes {
    // add every root here
    constructor(app) {
        //its from ..api/user
        this.userRoutes = new routes_1.UserRoutes();
        this.divisionRoutes = new routes_2.DivisionRoutes();
        this.verify = new verify_token_1.Verify();
        this.appConstant = new constant_1.default();
        this.userRoutes.route(app, this.appConstant.baseURL + '/gs');
        this.divisionRoutes.route(app, this.appConstant.baseURL + '/gs_Division');
        app.all('*', function (req, res) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}
exports.AppRoutes = AppRoutes;
