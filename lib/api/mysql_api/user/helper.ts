
import { Request, Response } from "express";
import { AppFunction } from "../../../core/app";


export default class Helper {
  public static loginResponse = (result) => {
    const temUser = { ...result[0][0] };
    temUser.token = AppFunction.createJwtToken(temUser.code);
    delete temUser.password;
    delete temUser.isDeleted;
    temUser.divisionIds = [];

     result[1].map((item) => {
      temUser.divisionIds.push({
        id: item.divisionId,
        name: item.name
      })
    })
    
    return temUser;
  };

  public static getToken = (code:string): {token?: string}  => {
    
    const temUInfo: {token?: string} = {};
    temUInfo.token = AppFunction.createJwtToken(code);
    return temUInfo;
  };
}
