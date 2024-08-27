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
        app.post(url + '/addFamily/:divisionId', this.verify.verify, (req, res) => {
            this.userController.addFamily(req, res);
        });
        //Get Family By id
        app.get(url + '/:divisionId/:familyId', this.verify.verify, (req, res) => {
            this.userController.get_family(req, res);
        });
        //Update Family
        app.put(url + '/:gsDivisionId/:familyId', this.verify.verify, (req, res) => {
            this.userController.update_Family(req, res);
        });
        //Delete Family
        app.delete(url + '/:divisionId/:familyId', this.verify.verify, (req, res) => {
            this.userController.delete_family(req, res);
        });
        //Add family Member
        app.post(url + '/:divisionId/:familyId/addMember', this.verify.verify, (req, res) => {
            this.userController.addMember(req, res);
        });
        //Delete Family Member
        app.delete(url + '/:divisionId/:familyId/deleteMember/:memberId', this.verify.verify, (req, res) => {
            this.userController.deleteMember(req, res);
        });
        //Update Family Member
        app.patch(url + '/:gsDivisionId/:familyId/members/:memberId', this.verify.verify, (req, res) => {
            this.userController.updateMember(req, res);
        });
        //Search family By Name
        app.get(url + '/:divisionId', (req, res) => {
            this.userController.searchFamily(req, res);
        });
        //Update GS Profile
        app.patch(url + '/update/:gsId', (req, res) => {
            this.userController.updateGsProfile(req, res);
        });
        // List all families in a Gs division
        app.post(url + '/getFamilies', (req, res) => {
            this.userController.listAllFamilies(req, res);
        });
        // List all members of a family
        app.post(url + '/getMembers', (req, res) => {
            this.userController.listAllMembers(req, res);
        });
        // Add history into family
        app.post(url + '/:divisionId/:familyId/history/add', this.verify.verify, (req, res) => {
            this.userController.addHistory(req, res);
        });
        //List all histories of a family
        app.get(url + '/:divisionId/:familyId/histories', this.verify.verify, (req, res) => {
            this.userController.getHistories(req, res);
        });
        //Get Family Count in a gs division
        // app.get(url+'/gsdivision/:gsdivisionid/families', (req: Request, res: Response) => {
        //     this.userController.getFamilyCount(req, res);
        // });
        //Get Childrens Count in a gs division
        // app.get(url+'/gsdivision/:gsDivisionId/childrens', (req: Request, res: Response) => {
        //     this.userController.getChildrensCount(req, res);
        // });
        //Get SeniorCitizens Count in a gs division
        //  app.get(url+'/gsdivision/:gsDivisionId/seniorcitizens', (req: Request, res: Response) => {
        //     this.userController.getSeniorCitizensCount(req, res);
        // });
        //Get Government Employees Count in a gs division
        //  app.get(url+'/gsdivision/:gsDivisionId/governmentemployees', (req: Request, res: Response) => {
        //     this.userController.getGovernmentEmployeesCount(req, res);
        // });
    }
}
exports.UserRoutes = UserRoutes;
