
import { Request, Response } from "express";
import { AppFunction } from "../../../core/app";


export default class Helper {

  public static getToken = (code:string): {token?: string}  => {
    
    const temUInfo: {token?: string} = {};
    temUInfo.token = AppFunction.createJwtToken(code);
    return temUInfo;
  };

  public static userResponse = (userData: any) => {
    const userInfo = { ...userData[0][0] };
    delete userInfo.password;
    delete userInfo.isDeleted;
    userInfo.divisionIds = [];

    userData[1].map((item) => {
      userInfo.divisionIds.push({
        id: item.divisionId,
        name: item.name
      })
    })
    
    return userInfo;
  }
}
