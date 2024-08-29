"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const controller_1 = require("./controller");
class UserRoutes {
    constructor() {
        this.userCtrl = new controller_1.UserController();
    }
    route(app, url) {
        app.post(url + "/login", (req, res) => {
            this.userCtrl.login(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
