"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoute = void 0;
const controller_1 = require("./controller");
class AppRoute {
    constructor() {
        this.appCtrl = new controller_1.AppController();
    }
    route(app, url) {
        app.post(url + "/info", (req, res) => {
            this.appCtrl.getAppInfo(req, res);
        });
    }
}
exports.AppRoute = AppRoute;
