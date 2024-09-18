
import { Request, Response } from "express";
import { AppFunction } from "../../../core/app";


export default class Helper {
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

  public static getToken = (code:string, role: number): {token?: string}  => {
    
    const temUInfo: {token?: string} = {};
    temUInfo.token = AppFunction.createJwtToken(code,role);
    return temUInfo;
  };

  public static userResponse = (userData: any) => {
    const userInfo = { ...userData[0][0] };
    delete userInfo.password;
    delete userInfo.isDeleted;
    userInfo.divisionIds = [];

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
  }

  public static userRes = (userData: any) => {
    const userInfo = { ...userData[0][0] };
    delete userInfo.password;
    delete userInfo.isDeleted;
    userInfo.divisionIds = [];


    userData[1].forEach((item) => {
      const existingDivision = userInfo.divisionIds.find(div => div.id === item.divisionId);

      if (existingDivision) {
          existingDivision.villages.push({
              id: item.villageId,
              name: item.villageName
          });
      } else {
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
  }
}
