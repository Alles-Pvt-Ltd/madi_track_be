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
        app.post(url + "/login", // Login route
        class_1.Validation.registerValidation, // You can adjust validation rules as per your needs
        (req, res) => {
            this.userCtrl.login(req, res); // Correcting the function call
        });
        app.post(url + "/register", // Register route
        class_1.Validation.registerValidation, // You can adjust validation rules as per your needs
        (req, res) => {
            this.userCtrl.register(req, res); // Correcting the function call
        });
        app.put(url + "/updateUser", class_1.Validation.updateValidation, (req, res) => {
            this.userCtrl.updateUser(req, res);
        });
        app.get(url + "/getAllUsers", (req, res) => {
            this.userCtrl.getAllUsers(req, res);
        });
        app.get(url + "/getUserById/:id", (req, res) => {
            this.userCtrl.getUserById(req, res);
        });
        app.get(url + "/deleteUser/:id", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.deleteUser(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
