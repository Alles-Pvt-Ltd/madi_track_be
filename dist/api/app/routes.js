"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const controller_1 = require("./controller");
const fileUpload_1 = require("../../core/fileUpload");
const class_1 = require("../../api/app/class");
class AppRoutes {
    constructor() {
        this.appCtrl = new controller_1.AppController();
    }
    route(app, url) {
        app.post(url + "/add", fileUpload_1.FileUpload.upload("image"), class_1.AppValidation.addValidation, (req, res) => {
            this.appCtrl.add(req, res);
        });
        app.put(url + "/update/:sid", fileUpload_1.FileUpload.upload("image"), class_1.AppValidation.updateValidation, (req, res) => {
            this.appCtrl.update(req, res);
        });
        app.get(url + "/getById/:sid", (req, res) => {
            this.appCtrl.getById(req, res);
        });
        app.delete(url + "/delete/:sid", (req, res) => {
            this.appCtrl.delete(req, res);
        });
        app.get(url + "/getAll", (req, res) => {
            this.appCtrl.getAll(req, res);
        });
    }
}
exports.AppRoutes = AppRoutes;
