"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../core/app");
class Helper {
}
exports.default = Helper;
Helper.loginResponse = (user) => {
    const temUser = Object.assign({}, user);
    temUser.token = app_1.AppFunction.createJwtToken(user.code);
    delete temUser.password;
    delete temUser.isDeleted;
    return temUser;
};
Helper.getToken = (code) => {
    const temUInfo = {};
    temUInfo.token = app_1.AppFunction.createJwtToken(code);
    return temUInfo;
};
