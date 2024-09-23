"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const app_1 = require("../../../database/mysql/app");
const response_1 = require("../../../core/response");
class AppController {
    constructor() {
        this.getAppInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const version = req.body.version;
            const getAppVersion = yield app_1.App.getAppVersion(parseInt(version.split('.').join("")));
            if (getAppVersion.err) {
                return (0, response_1.failureResponse)(getAppVersion.message, res);
            }
            const response = {
                isAppUpdate: getAppVersion.data.length > 0
            };
            return (0, response_1.successResponse)(response, "Success", res);
        });
    }
}
exports.AppController = AppController;
