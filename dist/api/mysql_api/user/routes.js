"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("./class");
const jwt_1 = require("../../../core/jwt");
class UserRoutes {
    constructor() {
        this.userCtrl = new controller_1.UserController();
    }
    route(app, url) {
        app.post(url + "/login", class_1.Validation.loginValidation, (req, res) => {
            this.userCtrl.login(req, res);
        });
        app.post(url + "/register", class_1.Validation.registerValidation, (req, res) => {
            this.userCtrl.register(req, res);
        });
        app.get(url + "/reference", (req, res) => {
            this.userCtrl.reference(req, res);
        });
        app.post(url + "/change_password", class_1.Validation.changePasswordValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.changePassword(req, res);
        });
        app.get(url + "/info", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.userInfo(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
