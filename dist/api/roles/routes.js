"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("../../api/user/class");
const verify_token_1 = require("../../app/verify_token");
class RolesRoutes {
    constructor() {
        this.rolesController = new controller_1.RolesController();
        this.verify = new verify_token_1.Verify();
        this.validation = new class_1.Validation();
    }
    route(app, url) {
        // get all roles
        app.get(url + '/:page_number', this.verify.verify, (req, res) => {
            this.rolesController.getAllRoles(req, res);
        });
        // add role
        app.post(url, this.verify.verify, this.validation.addRoleValidation, (req, res) => {
            this.rolesController.addRole(req, res);
        });
        // update role
        app.patch(url + "/:code", this.verify.verify, this.validation.updateRoleValidation, (req, res) => {
            this.rolesController.updateRole(req, res);
        });
        // delete role
        app.delete(url + "/:code", this.verify.verify, this.validation.updateRoleValidation, (req, res) => {
            this.rolesController.deleteRole(req, res);
        });
    }
}
exports.RolesRoutes = RolesRoutes;
