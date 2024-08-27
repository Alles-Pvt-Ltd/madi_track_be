"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_TYPE_ERROR = exports.ResponseStatusCodes = exports.APPLICATION_JSON = void 0;
exports.APPLICATION_JSON = 'application/json';
var ResponseStatusCodes;
(function (ResponseStatusCodes) {
    ResponseStatusCodes[ResponseStatusCodes["success"] = 200] = "success";
    ResponseStatusCodes[ResponseStatusCodes["bad_request"] = 400] = "bad_request";
    ResponseStatusCodes[ResponseStatusCodes["not_found"] = 404] = "not_found";
    ResponseStatusCodes[ResponseStatusCodes["Unauthorized"] = 401] = "Unauthorized";
    ResponseStatusCodes[ResponseStatusCodes["Forbidden"] = 403] = "Forbidden";
    ResponseStatusCodes[ResponseStatusCodes["internal_server_error"] = 500] = "internal_server_error";
})(ResponseStatusCodes = exports.ResponseStatusCodes || (exports.ResponseStatusCodes = {}));
exports.CONTENT_TYPE_ERROR = "Content type must be application/json";
