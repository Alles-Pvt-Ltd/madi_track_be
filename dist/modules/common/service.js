"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.commenError = exports.DatanotFound = exports.notFound = exports.validationError = exports.forbidden = exports.mongoError = exports.insufficientParameters = exports.failureResponse = exports.tokenResponse = exports.successResponse = void 0;
const model_1 = require("./model");
function successResponse(message, DATA, res) {
    res.status(model_1.response_status_codes.success).json({
        status: true,
        message: message,
        data: DATA
    });
}
exports.successResponse = successResponse;
function tokenResponse(message, DATA, res) {
    res.header('auth_token', DATA.token).status(model_1.response_status_codes.success).json({
        status: true,
        message: message,
        data: DATA
    });
}
exports.tokenResponse = tokenResponse;
function failureResponse(message, DATA, res) {
    res.status(model_1.response_status_codes.bad_request).json({
        status: false,
        message: message,
        data: DATA
    });
}
exports.failureResponse = failureResponse;
//
function insufficientParameters(message, res) {
    res.status(model_1.response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        message: message,
        DATA: {}
    });
}
exports.insufficientParameters = insufficientParameters;
function mongoError(err, res) {
    res.status(model_1.response_status_codes.success).json({
        status: false,
        message: 'mongo error',
        data: err
    });
}
exports.mongoError = mongoError;
//
function forbidden(message, req, res) {
    res.status(model_1.response_status_codes.Forbidden).json({
        status: false,
        message: message,
        data: req
    });
}
exports.forbidden = forbidden;
//
function validationError(message, req, res) {
    res.status(model_1.response_status_codes.bad_request).json({
        status: false,
        message: message,
        data: req
    });
}
exports.validationError = validationError;
//
function notFound(req, res) {
    res.status(model_1.response_status_codes.not_found).json({
        status: false,
        message: "not found",
        data: req
    });
}
exports.notFound = notFound;
function DatanotFound(message, req, res) {
    res.status(model_1.response_status_codes.not_found).json({
        status: false,
        message: message,
        data: req
    });
}
exports.DatanotFound = DatanotFound;
function commenError(err, req, res) {
    res.status(model_1.response_status_codes.success).json({
        status: false,
        message: err,
        data: req
    });
}
exports.commenError = commenError;
function serverError(message, req, res) {
    res.status(model_1.response_status_codes.internal_server_error).json({
        status: false,
        message: message,
        data: req
    });
}
exports.serverError = serverError;
