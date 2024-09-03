"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../core/app");
class Helper {
}
exports.default = Helper;
Helper.loginResponse = (result) => {
    const temUser = Object.assign({}, result[0][0]);
    temUser.token = app_1.AppFunction.createJwtToken(temUser.code);
    delete temUser.password;
    delete temUser.isDeleted;
    temUser.divisionIds = [];
    result[1].map((item) => {
        temUser.divisionIds.push({
            id: item.divisionId,
            name: item.name
        });
    });
    return temUser;
};
Helper.getToken = (code) => {
    const temUInfo = {};
    temUInfo.token = app_1.AppFunction.createJwtToken(code);
    return temUInfo;
};
