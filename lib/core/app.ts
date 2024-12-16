import * as password_hash from "password-hash";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

export class AppFunction {
  public static isInt(n: any) {
    n = parseFloat(n);
    return Number(n) === n && n % 1 === 0;
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

  public static jwtVerify(jwtToken: string): { username: string; userId: number; email: string } {
    try {
      const decodedToken = jwt.verify(jwtToken, "HJOGHJOAHG") as { username: string; userId: number; email: string };
      decodedToken.userId = Number(decodedToken.userId);  // Ensure userId is a number
      return decodedToken;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  public static createJwtToken(name: string, id: number, email: string) {
    return jwt.sign({ username: name, userId: id, email: email }, "HJOGHJOAHG", {
      // expiresIn: "2h", // token will expire after 2 hours
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
