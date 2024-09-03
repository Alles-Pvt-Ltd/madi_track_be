"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviders = void 0;
const connection_1 = require("../../mysql/connection");
const service_providers_query_1 = require("./service_providers_query");
class ServiceProviders {
    // get all service providers
    getAllServiceProviders(req, cb) {
        // get all service providers query
        const queryString = service_providers_query_1.Query.getAllServiceProviders();
        // get all service providers
        return connection_1.default.connct(queryString, req, (err, d, da) => {
            return cb(err, d, da);
        });
    }
}
exports.ServiceProviders = ServiceProviders;
