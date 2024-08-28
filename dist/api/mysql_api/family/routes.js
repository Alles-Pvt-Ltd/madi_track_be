"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRoutes = void 0;
const controller_1 = require("./controller");
const jwt_1 = require("../../../core/jwt");
const class_1 = require("./class");
class FamilyRoutes {
    constructor() {
        this.userCtrl = new controller_1.FamilyController();
    }
    route(app, url) {
        app.post(url + "/add", class_1.Validation.addFamilyValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.addFamily(req, res);
        });
        app.get(url + "/list", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getAllFamiliesDetails(req, res);
        });
        app.post(url + "/member/add", class_1.Validation.addMemberValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.addMember(req, res);
        });
        app.put(url + "/member/update", class_1.Validation.updateMemberValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.updateMember(req, res);
        });
        app.get(url + "/view/:familyId", jwt_1.JwtToken.verify, // Adding JWT verification for consistency
        (req, res) => {
            this.userCtrl.getFamilyDetailsById(req, res);
        });
    }
}
exports.FamilyRoutes = FamilyRoutes;
