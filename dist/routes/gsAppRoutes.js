"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsAppRoutes = void 0;
const routes_1 = require("../api/user/routes");
const routes_2 = require("../api/app/routes");
const constant_1 = require("../config/constant");
const verify_token_1 = require("../app/verify_token");
class GsAppRoutes {
    // add every root here
    constructor(app) {
        this.userRoutes = new routes_1.UserRoutes();
        this.appRoutes = new routes_2.AppRoutes();
        this.verify = new verify_token_1.Verify();
        this.appConstant = new constant_1.default();
        this.userRoutes.route(app, this.appConstant.baseURL + '/user');
        this.appRoutes.route(app, this.appConstant.baseURL + '/app');
        app.all('*', function (req, res) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}
exports.GsAppRoutes = GsAppRoutes;
