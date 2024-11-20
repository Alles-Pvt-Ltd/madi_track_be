import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request } from "express";

export class AppFunction {
  public static isInt(n: any): boolean {
    return Number.isInteger(Number(n));
  }

  public static isFloat(n: any): boolean {
    return !Number.isInteger(Number(n)) && !isNaN(parseFloat(n));
  }

  public static isString(s: any): boolean {
    return typeof s === "string" && s.trim().length > 0;
  }

  public static contentType(req: Request): string {
    const contentType = req.get("Content-Type");
    return contentType && contentType.includes("application/json") ? "json" : "others";
  }

  public static trimAndLowercase(str: string): string {
    return str.toLowerCase().trim();
  }

  public static async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  public static async passwordVerify(inputPassword: string, storedHash: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedHash);
  }

  public static createJwtToken(username: string, email: string): string {
    const payload = { username, email };
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  public static jwtVerify(token: string): any {
    try {
      const secret = process.env.JWT_SECRET || "your_jwt_secret";
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}
