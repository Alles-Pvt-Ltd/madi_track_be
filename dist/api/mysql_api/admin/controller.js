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
exports.AdminController = void 0;
const response_1 = require("../../../core/response");
const admin_1 = require("../../../database/mysql/admin");
class AdminController {
    constructor() {
        this.getAllGsList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gsList = yield admin_1.Admin.getAllGsList();
            if (gsList.err) {
                return (0, response_1.failureResponse)(gsList.message, res);
            }
            return (0, response_1.successResponse)(gsList.data, gsList.message, res);
        });
    }
}
exports.AdminController = AdminController;
