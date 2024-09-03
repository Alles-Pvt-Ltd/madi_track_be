"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("../../api/user/class");
const verify_token_1 = require("../../app/verify_token");
class ServicesRoutes {
    constructor() {
        this.servicesController = new controller_1.ServicesController();
        this.validation = new class_1.Validation();
        this.verify = new verify_token_1.Verify();
    }
    route(app, url) {
        // add service photos
        // app.post(
        //   url + "/:code",
        //   FileUpload.fileUpload.single("image"),
        //   (req: any, res: Response) => {
        //     this.servicesController.addServices(req, res);
        //   }
        // );
        // get services
        app.get(url + '/:page_number', (req, res) => {
            this.servicesController.getServices(req, res);
        });
        // get all services
        app.get(url, (req, res) => {
            this.servicesController.getAllServices(req, res);
        });
        // get service photos
        app.get(url + '/:imgae', (req, res) => {
            true;
            // this.servicesController.getServiceImage(req, res);
        });
        // add Services
        app.post(url, this.verify.verify, this.validation.addServiceValidation, (req, res) => {
            this.servicesController.addService(req, res);
        });
        // update Services
        app.patch(url + "/:code", this.verify.verify, this.validation.updateServiceValidation, (req, res) => {
            this.servicesController.updateService(req, res);
        });
        // delete Services
        app.delete(url + "/:code", this.verify.verify, this.validation.updateServiceValidation, (req, res) => {
            this.servicesController.deleteService(req, res);
        });
    }
}
exports.ServicesRoutes = ServicesRoutes;
