"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("./class");
const jwt_1 = require("../../core/jwt");
class UserRoutes {
    constructor() {
        this.userCtrl = new controller_1.UserController();
    }
    route(app, url) {
        app.post(`${url}/login`, class_1.Validation.loginValidation, (req, res) => {
            controller_1.UserController.login(req, res);
        });
        app.post(url + "/register", class_1.Validation.registerValidation, (req, res) => {
            controller_1.UserController.register(req, res);
        });
        app.put(url + "/updateUser", class_1.Validation.updateValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.updateUser(req, res);
        });
        app.get(url + "/getAllUsers", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getAllUsers(req, res);
        });
        app.get(url + "/getUserById/:id", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getUserById(req, res);
        });
        app.get(url + "/deleteUser/:id", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.deleteUser(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
