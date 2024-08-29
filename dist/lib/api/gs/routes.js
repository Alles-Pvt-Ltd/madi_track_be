"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const controller_1 = require("./controller");
const verify_token_1 = require("../../app/verify_token");
const class_1 = require("../../api/gs/class");
class UserRoutes {
    constructor() {
        this.userController = new controller_1.UserController();
        this.verify = new verify_token_1.Verify();
        this.validation = new class_1.Validation();
    }
    route(app, url) {
        //create user
        app.post(url + '/register', this.validation.registerValidation, (req, res) => {
            this.userController.userRegistration(req, res);
        });
        //login
        app.post(url + '/login', this.validation.loginValidation, (req, res) => {
            this.userController.login(req, res);
        });
        //Add Family
        app.post(url + '/addFamily/:divisionId', (req, res) => {
            this.userController.addFamily(req, res);
        });
        //Search Family By id
        app.get(url + '/:divisionId/:familyId', (req, res) => {
            this.userController.get_family(req, res);
        });
        //Update Family
        app.put(url + '/:gsDivisionId/:familyId', (req, res) => {
            this.userController.update_Family(req, res);
        });
        //Delete Family
        app.delete(url + '/:divisionId/:familyId', (req, res) => {
            this.userController.delete_family(req, res);
        });
        //Add family Member
        app.post(url + '/:divisionId/:familyId/addMember', (req, res) => {
            this.userController.addMember(req, res);
        });
        //Delete Family Member
        app.delete(url + '/:divisionId/:familyId/members/:memberId', (req, res) => {
            this.userController.deleteMember(req, res);
        });
        //Update Family Member
        app.put(url + '/:gsDivisionId/:familyId/members/:memberId', (req, res) => {
            this.userController.updateMember(req, res);
        });
        //Search family 
        app.get(url + '/:divisionId', (req, res) => {
            this.userController.searchFamily(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
