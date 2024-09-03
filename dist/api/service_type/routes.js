"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("../user/class");
const verify_token_1 = require("../../app/verify_token");
class TypeRoutes {
    constructor() {
        this.typeController = new controller_1.TypeController();
        this.validation = new class_1.Validation();
        this.verify = new verify_token_1.Verify();
    }
    route(app, url) {
        // get Type
        app.get(url + "/:page_num", (req, res) => {
            this.typeController.getType(req, res);
        });
        // get all Type
        app.get(url, (req, res) => {
            this.typeController.getAllType(req, res);
        });
        // add Type
        app.post(url, this.verify.verify, this.validation.addTypeValidation, (req, res) => {
            this.typeController.addType(req, res);
        });
        // update Type
        app.patch(url + "/:code", this.verify.verify, this.validation.updateTypeValidation, (req, res) => {
            this.typeController.updateType(req, res);
        });
        // delete Type
        app.delete(url + "/:code", this.verify.verify, this.validation.updateTypeValidation, (req, res) => {
            this.typeController.deleteType(req, res);
        });
    }
}
exports.TypeRoutes = TypeRoutes;
