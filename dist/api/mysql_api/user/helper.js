"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../core/app");
class Helper {
}
exports.default = Helper;
// public static loginResponse = (user) => {
//   const tempUser = { ...user[0][0] }
//   tempUser.token = AppFunction.createJwtToken(tempUser.code)
//   delete tempUser.password;
//   delete tempUser.isDeleted;
//   delete tempUser.role;
//   delete tempUser.firstname;
//   delete tempUser.lastname;
//   tempUser.divisionId = user[1]
//   user[1].map((item) => {
//     tempUser.divisionIds.push({
//       id: item.divisionId,
//       name: item.name
//     })
//   })
//   return tempUser;
// }
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
