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
        app.get(url + "/list/:divisionId", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getAllFamiliesDetails(req, res);
        });
        app.post(url + "/member/add", class_1.Validation.addMemberValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.addMember(req, res);
        });
        app.get(url + "/member/:id", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getMemmberById(req, res);
        });
        app.put(url + "/member/update", class_1.Validation.updateMemberValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.updateMember(req, res);
        });
        app.get(url + "/view/:familyId", jwt_1.JwtToken.verify, // Adding JWT verification for consistency
        (req, res) => {
            this.userCtrl.getFamilyDetailsById(req, res);
        });
        app.post(url + "/history/add", class_1.Validation.familyHistoryValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.addHistory(req, res);
        });
        // Family update
        app.put(url + "/update", class_1.Validation.updateFamilyValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.updateFamily(req, res);
        });
        app.put(url + "/history/update", class_1.Validation.familyHistoryUpdateValidation, jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.updateHistory(req, res);
        });
        app.post(url + "/history/delete/:id", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.deleteHistory(req, res);
        });
        app.post(url + "/transfer/request", 
        // Validation.addMemberValidation,
        jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.initiateFamilyTransfer(req, res);
        });
        app.get(url + "/transfer/list/:divisionId", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.getAllFamilyTransfersForAGsDivision(req, res);
        });
        app.post(url + "/transfer/update", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.transferAcceptOrRejectByGs(req, res);
        });
        app.post(url + "/property/add", jwt_1.JwtToken.verify, (req, res) => {
            this.userCtrl.addProperty(req, res);
        });
    }
}
exports.FamilyRoutes = FamilyRoutes;
