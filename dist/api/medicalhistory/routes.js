"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistoryRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("./class");
const jwt_1 = require("../../core/jwt");
const fileUpload_1 = require("../../core/fileUpload");
class MedicalHistoryRoutes {
    constructor() {
        this.mediCtrl = new controller_1.MedicalHistoryController();
    }
    route(app, url) {
        app.post(`${url}/add`, jwt_1.JwtToken.verify, fileUpload_1.FileUpload.upload("document"), class_1.Validation.addValidation, this.mediCtrl.add);
        app.put(`${url}/update/:hid`, jwt_1.JwtToken.verify, fileUpload_1.FileUpload.upload("document"), class_1.Validation.updateValidation, this.mediCtrl.update);
        app.delete(`${url}/delete/:hid`, jwt_1.JwtToken.verify, this.mediCtrl.delete);
        app.get(`${url}/getMedihis/:hid`, jwt_1.JwtToken.verify, this.mediCtrl.getMedihis);
        app.get(`${url}/list`, jwt_1.JwtToken.verify, this.mediCtrl.list);
    }
}
exports.MedicalHistoryRoutes = MedicalHistoryRoutes;
