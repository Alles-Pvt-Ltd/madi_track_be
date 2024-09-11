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
        app.get(url + "/gslist/:divisionId", jwt_1.JwtToken.verify, (req, res) => {
            this.adminCtrl.getAllGsList(req, res);
        });
        app.post(url + "/family/list", jwt_1.JwtToken.verify, (req, res) => {
            this.adminCtrl.getAllFamilies(req, res);
        });
        app.get(url + "/family/transfer/list/:divisionId", jwt_1.JwtToken.verify, (req, res) => {
            this.adminCtrl.getAllFamilyTransfers(req, res);
        });
        app.post(url + "/family/transfer/update", jwt_1.JwtToken.verify, (req, res) => {
            this.adminCtrl.updateFamilyTransferStatus(req, res);
        });
    }
}
exports.AdminRoutes = AdminRoutes;
