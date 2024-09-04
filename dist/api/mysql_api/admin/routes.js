"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const controller_1 = require("./controller");
const jwt_1 = require("../../../core/jwt");
class AdminRoutes {
    constructor() {
        this.adminCtrl = new controller_1.AdminController();
    }
    route(app, url) {
        app.get(url + "/gslist", jwt_1.JwtToken.verify, (req, res) => {
            this.adminCtrl.getAllGsList(req, res);
        });
    }
}
exports.AdminRoutes = AdminRoutes;
