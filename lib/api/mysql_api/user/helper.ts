
import { Request, Response } from "express";
import { AppFunction } from "../../../core/app";


export default class Helper {
  public static loginResponse = (user, divisionName) => {
    const temUser = { ...user };
    temUser.token = AppFunction.createJwtToken(user.code);
    temUser.divisionName = divisionName;
    delete temUser.password;
    delete temUser.isDeleted;
    return temUser;
  };

  public static getToken = (code:string): {token?: string}  => {
    
    const temUInfo: {token?: string} = {};
    temUInfo.token = AppFunction.createJwtToken(code);
    return temUInfo;
  };
}
