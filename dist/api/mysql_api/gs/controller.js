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
exports.UserController = void 0;
const user_1 = require("../../../database/mysql/user");
const response_1 = require("../../../core/response");
class UserController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const loginResponse = yield user_1.User.login(req.body);
            if (loginResponse.err) {
                return (0, response_1.failureResponse)(loginResponse.message, res);
            }
            // if (
            //   !AppFunction.passwordVerify(
            //     req.body.password,
            //     loginResponse.data.password
            //   )
            // ) {
            //   return failureResponse(StringConstant.usernamePasswordMismatch, res);
            // }
            return (0, response_1.successResponse)(loginResponse.data[0], "Login successfull", res);
        });
    }
}
exports.UserController = UserController;
