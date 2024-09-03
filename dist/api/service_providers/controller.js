"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvidersController = void 0;
const service_1 = require("../../modules/common/service");
const service_providers_1 = require("../../database/mysql/service_providers/service_providers");
class ServiceProvidersController {
    constructor() {
        this.serviceProviders = new service_providers_1.ServiceProviders();
    }
    getAllServiceProvider(req, res) {
        this.serviceProviders.getAllServiceProviders(req, (err, d, da) => {
            const errorType = typeof err;
            if (errorType == "boolean" && err == true) {
                return (0, service_1.sqlError)("", res);
            }
            else if (err) {
                return (0, service_1.commenError)(err, da, res);
            }
            else {
                return (0, service_1.successResponse)("get all service providers successfull", d, res);
            }
        });
    }
}
exports.ServiceProvidersController = ServiceProvidersController;
