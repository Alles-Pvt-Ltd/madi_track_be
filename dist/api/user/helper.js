"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../core/app");
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
Helper.getToken = (code, role) => {
    const temUInfo = {};
    temUInfo.token = app_1.AppFunction.createJwtToken(code, role);
    return temUInfo;
};
Helper.userResponse = (userData) => {
    const userInfo = Object.assign({}, userData[0][0]);
    delete userInfo.password;
    delete userInfo.isDeleted;
    userInfo.divisionIds = [];
    // userData[1].map((item) => {
    //       userInfo.divisionIds.push({
    //         id: item.divisionId,
    //         name: item.name,
    //         isDefault: item.isDefault
    //       })
    //     })
    userData[1].forEach((item) => {
        const existingDivision = userInfo.divisionIds.find(div => div.id === item.divisionId);
        if (existingDivision) {
            existingDivision.villages.push({
                id: item.villageId,
                name: item.villageName
            });
        }
        else {
            userInfo.divisionIds.push({
                id: item.divisionId,
                name: item.name,
                isDefault: item.isDefault,
                villages: [{
                        id: item.villageId,
                        name: item.villageName
                    }]
            });
        }
    });
    return userInfo;
};
Helper.gsDivisionsResponse = (divisionData, villageData) => {
    const divisionRes = [];
    divisionData.forEach((division) => {
        // Filter villageData for match the gsDivisionId to join every village with each division
        const villagesForDivision = villageData
            .filter((village) => village.gsDivisionId === division.id)
            .map((village) => ({
            id: village.id,
            label: village.label
        }));
        divisionRes.push({
            id: division.id,
            label: division.label,
            villages: villagesForDivision
        });
    });
    return divisionRes;
};
