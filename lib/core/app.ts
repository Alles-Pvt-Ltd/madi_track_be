import * as password_hash from "password-hash";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export  class AppFunction {
  public static isInt(n: any) {
    n = parseFloat(n);
    return Number(n) === n && n % 1 !== 0;
  }

  public static isFloat(n: any) {
    n = parseFloat(n);
    return Number(n) === n && n % 1 !== 0;
  }

  public static isString(s: any) {
    if (s.length === 0) return false;
    return typeof s === "string" || s instanceof String;
  }

  public static contentType(req: Request): string {
    if (req.get("Content-Type") === "application/json") return "json";
    else if (req.get("Content-Type") === "application/json; charset=utf-8") return "json";
    else return "others";
  }

  public static trimAndLovercase(str: string) {
    return str.toLowerCase().trim();
  }

  public static encryptPassword(str: string) {
    return password_hash.generate(str);
  }

  public static passwordVerify(pw: string, db_pw: string) {
    return password_hash.verify(pw, db_pw);
  }

  public static jwtVerify(jwtToken: string) {
    return jwt.verify(jwtToken, "HJOGHJOAHF") as {code:string};
  }

  public static createJwtToken(userCode: string) {
    return jwt.sign({ code: userCode }, "HJOGHJOAHF", {
      // expiresIn: "2h", //token will expaire after 2 hours
    });
  }

  public static uuid() {
    return uuidv4();
  }

  public static getSignOfNumber(num: any) {
    return Math.sign(num);
  }

  public static convertStringToNumber(num: any) {
    return Number(num);
  }

  public static typeOfVariable(variable: any) {
    return typeof variable;
  }
}
