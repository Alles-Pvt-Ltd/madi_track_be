"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonError = exports.notFound = exports.validationError = exports.forbidden = exports.tokenResponse = exports.badResponse = exports.failureResponse = exports.successResponse = void 0;
const constant_1 = require("./common/constant");
function successResponse(data, message, res) {
    res.status(constant_1.ResponseStatusCodes.success).json({
        code: constant_1.ResponseStatusCodes.success,
        status: true,
        message,
        data,
    });
}
exports.successResponse = successResponse;
function failureResponse(message, res) {
    res.status(constant_1.ResponseStatusCodes.success).json({
        code: constant_1.ResponseStatusCodes.success,
        status: false,
        message,
        data: {},
    });
}
exports.failureResponse = failureResponse;
function badResponse(data, res) {
    const errorMessage = data && data.length > 0 ? data[0].msg : "";
    res.status(constant_1.ResponseStatusCodes.bad_request).json({
        code: constant_1.ResponseStatusCodes.bad_request,
        status: false,
        message: errorMessage,
        data,
    });
}
exports.badResponse = badResponse;
function tokenResponse(message, DATA, res) {
    res
        .header("auth_token", DATA.token)
        .status(constant_1.ResponseStatusCodes.success)
        .json({
        status: true,
        message: message,
        data: DATA,
    });
}
exports.tokenResponse = tokenResponse;
function forbidden(message, req, res) {
    res.status(constant_1.ResponseStatusCodes.Forbidden).json({
        status: false,
        message: message,
        data: req,
    });
}
exports.forbidden = forbidden;
//
function validationError(message, req, res) {
    res.status(constant_1.ResponseStatusCodes.bad_request).json({
        status: false,
        message: message,
        data: req,
    });
}
exports.validationError = validationError;
//
function notFound(req, res) {
    res.status(constant_1.ResponseStatusCodes.not_found).json({
        status: false,
        message: "not found",
        data: req,
    });
}
exports.notFound = notFound;
function commonError(err, req, res) {
    res.status(constant_1.ResponseStatusCodes.success).json({
        status: false,
        message: err,
        data: req,
    });
}
exports.commonError = commonError;
