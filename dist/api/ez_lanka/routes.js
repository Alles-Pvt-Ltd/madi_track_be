"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ez_lankaRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("../../api/user/class");
const verify_token_1 = require("../../app/verify_token");
class Ez_lankaRoutes {
    constructor() {
        this.ez_lankaController = new controller_1.Ez_lankaController();
        this.verify = new verify_token_1.Verify();
        this.validation = new class_1.Validation();
    }
    route(app, url) {
        // get ez_lanka_provider
        app.get(url + "/:page_num", this.verify.verify, (req, res) => {
            this.ez_lankaController.getEz_lanka(req, res);
        });
        // get all ez_lanka_provider
        app.get(url, this.verify.verify, (req, res) => {
            this.ez_lankaController.getAllEz_lanka(req, res);
        });
        // add ez_lanka_provider
        app.post(url, this.verify.verify, this.validation.addEz_lanka_providerValidation, (req, res) => {
            console.log('19');
            this.ez_lankaController.addEz_lanka(req, res);
        });
        // update ez_lanka_provider
        app.patch(url + "/:code", this.verify.verify, this.validation.updateEz_lanka_providerValidation, (req, res) => {
            this.ez_lankaController.updateEz_lanka(req, res);
        });
        // delete ez_lanka_provider
        app.delete(url + "/:code", this.verify.verify, this.validation.updateEz_lanka_providerValidation, (req, res) => {
            this.ez_lankaController.deleteEz_lanka(req, res);
        });
    }
}
exports.Ez_lankaRoutes = Ez_lankaRoutes;
