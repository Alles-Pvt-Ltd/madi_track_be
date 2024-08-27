"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionRoutes = void 0;
const controller_1 = require("./controller");
class DivisionRoutes {
    constructor() {
        this.user_controller = new controller_1.UserController();
    }
    route(app, url) {
        app.post(url + '/addDivision', (req, res) => {
            this.user_controller.addDivision(req, res);
        });
        app.get(url + '/allDivisions', (req, res) => {
            this.user_controller.getAllDivisions(req, res);
        });
        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });
        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });
    }
}
exports.DivisionRoutes = DivisionRoutes;
