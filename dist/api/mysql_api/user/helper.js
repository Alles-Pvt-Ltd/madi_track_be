"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../core/app");
class Helper {
}
exports.default = Helper;
Helper.getToken = (code) => {
    const temUInfo = {};
    temUInfo.token = app_1.AppFunction.createJwtToken(code);
    return temUInfo;
};
Helper.userResponse = (userData) => {
    const userInfo = Object.assign({}, userData[0][0]);
    delete userInfo.password;
    delete userInfo.isDeleted;
    userInfo.divisionIds = [];
    userData[1].map((item) => {
        userInfo.divisionIds.push({
            id: item.divisionId,
            name: item.name
        });
    });
    return userInfo;
};
