"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderRoutes = void 0;
const controller_1 = require("./controller");
class ServiceProviderRoutes {
    constructor() {
        this.serviceProvidersController = new controller_1.ServiceProvidersController();
    }
    route(app, url) {
        //get all service provider
        app.get(url, (req, res) => {
            this.serviceProvidersController.getAllServiceProvider(req, res);
        });
    }
}
exports.ServiceProviderRoutes = ServiceProviderRoutes;
