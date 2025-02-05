import { NextFunction, Request, Response  } from "express";
import { forbidden } from "./response";
import { AppFunction } from "./app";

export class JwtToken {
  public static verify(req: Request, res: Response, next: NextFunction): void{
    const verifyToken = req.header("token");
    if(!verifyToken){
        return forbidden("Access Denied: Token is missing",{},res);
        }
        try {
            const verified = AppFunction.jwtVerify(verifyToken);
            req.user = verified;
            next();
        } catch (error) {
            return forbidden("Invalid token", {}, res);
        }
    }

    public static get(req: Request): { userId: number } | null {
        const verifyToken = req.header("token");
        try {
            return AppFunction.jwtVerify(verifyToken) as { userId: number };
        } catch {
            return null;
        }
    }

  public static adminVerify(req: any, res: any, next: NextFunction) {
    const verifyToken = req.header("token");
    if (!verifyToken) {
      return forbidden("Access Denied, please check you are providing correct token", req.body, res);
    }
    try {
      const verified = AppFunction.jwtVerify(verifyToken);  // Ensure it contains userId
      if (verified.userId !== 2) { // Ensure userId is compared as a number
        return forbidden("Access Denied", req.body, res);
      }
      req.user = verified;
    } catch (error) {
      return forbidden("Please provide valid token", req.body, res);
    }

    return next();
  }
}
