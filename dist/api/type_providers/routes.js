"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRoutes = void 0;
const controller_1 = require("./controller");
const class_1 = require("../../api/user/class");
const verify_token_1 = require("../../app/verify_token");
class ProviderRoutes {
    constructor() {
        this.providersController = new controller_1.ProvidersController();
        this.validation = new class_1.Validation();
        this.verify = new verify_token_1.Verify();
    }
    route(app, url) {
        //get all  provider
        app.get(url, (req, res) => {
            this.providersController.getAllProviders(req, res);
        });
        //get provider
        app.get(url + "/providers/:page_num", (req, res) => {
            this.providersController.getProviders(req, res);
        });
        //get provider by code
        app.get(url + "/provider/:code", (req, res) => {
            console.log('20');
            this.providersController.getProviderByCode(req, res);
        });
        //get all  provider
        app.get(url + '/service', (req, res) => {
            this.providersController.getAllProvidersDetails(req, res);
        });
        // add provider
        app.post(url, this.verify.verify, this.validation.addProviderValidation, (req, res) => {
            // console.log(typeof req.body.provider_percentage);
            this.providersController.addProvider(req, res);
        });
        // update provider
        app.patch(url + "/:code", this.verify.verify, this.validation.updateProviderValidation, (req, res) => {
            this.providersController.updateProvider(req, res);
        });
        // delete provider
        app.delete(url + "/:code", this.verify.verify, this.validation.updateProviderValidation, (req, res) => {
            this.providersController.deleteProvider(req, res);
        });
        // add provider
        app.patch(url + "/commission/:provider_code", this.verify.verify, (req, res) => {
            this.providersController.updateCommission(req, res);
        });
        // get distibutor Commission
        app.get(url + '/distibutor-commission/:page_num', this.verify.verify, (req, res) => {
            this.providersController.getDistibutorCommission(req, res);
        });
        // create package
        // app.post(url+'/package',this.verify.verify,this.validation.addPackageValidation,(req: Request, res: Response) => {
        app.post(url + '/package', this.verify.verify, (req, res) => {
            console.log('64');
            this.providersController.addPackage(req, res);
        });
        // get all package
        app.get(url + '/packages/:page_num', this.verify.verify, (req, res) => {
            this.providersController.getPackage(req, res);
        });
        // get package by 
        app.get(url + '/package/:code', this.verify.verify, (req, res) => {
            this.providersController.getPackageByCode(req, res);
        });
    }
}
exports.ProviderRoutes = ProviderRoutes;
