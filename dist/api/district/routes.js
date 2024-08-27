"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictRoutes = void 0;
const controller_1 = require("./controller");
class DistrictRoutes {
    constructor() {
        this.userController = new controller_1.UserController();
    }
    route(app, url) {
        app.post(url + '/addDistrict', (req, res) => {
            this.userController.addDistrict(req, res);
        });
        // Get all GS divisions by district id
        app.get(url + '/:districtId/gsdivisions', (req, res) => {
            this.userController.getAllGsDivisions(req, res);
        });
        //Get all DS divisions by district id
        app.get(url + '/:districtId/DSdivisions', (req, res) => {
            this.userController.getAllDsDivisions(req, res);
        });
        //Get All Districts
        app.get(url + '', (req, res) => {
            this.userController.getAllDistricts(req, res);
        });
        // Get all GS divisions by Ds Division id
        app.get(url + '/:districtId/:ds_divisions_id', (req, res) => {
            this.userController.getAllGsDivisionsByDsDivisionId(req, res);
        });
        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });
        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });
    }
}
exports.DistrictRoutes = DistrictRoutes;
