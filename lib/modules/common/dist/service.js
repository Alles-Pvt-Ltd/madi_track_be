"use strict";
exports.__esModule = true;
exports.validationError = exports.forbidden = exports.sqlError = exports.insufficientParameters = exports.failureResponse = exports.tokenResponse = exports.successResponse = void 0;
var model_1 = require("./model");
function successResponse(message, DATA, res) {
    res.status(model_1.response_status_codes.success).json({
        status: 'SUCCESS',
        message: message,
        data: DATA
    });
}
exports.successResponse = successResponse;
function tokenResponse(message, DATA, res) {
    res.header('auth_token', DATA.token).status(model_1.response_status_codes.success).json({
        status: 'SUCCESS',
        message: message,
        data: DATA
    });
}
exports.tokenResponse = tokenResponse;
function failureResponse(message, DATA, res) {
    res.status(model_1.response_status_codes.success).json({
        status: 'FAILURE',
        message: message,
        data: DATA
    });
}
exports.failureResponse = failureResponse;
function insufficientParameters(res, req) {
    res.status(model_1.response_status_codes.bad_request).json({
        status: 'FAILURE',
        message: 'Insufficient parameters',
        data: req
    });
}
exports.insufficientParameters = insufficientParameters;
function sqlError(err, res) {
    res.status(model_1.response_status_codes.internal_server_error).json({
        status: 'FAILURE',
        message: 'mysql error',
        data: err
    });
}
exports.sqlError = sqlError;
function forbidden(message, req, res) {
    res.status(model_1.response_status_codes.Forbidden).json({
        status: 'FAILURE',
        message: message,
        data: req
    });
}
exports.forbidden = forbidden;
function validationError(message, req, res) {
    res.status(model_1.response_status_codes.bad_request).json({
        status: 'FAILURE',
        message: message,
        data: req
    });
}
exports.validationError = validationError;
