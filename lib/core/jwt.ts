import { NextFunction } from "express";
import { forbidden } from "./response";
import { AppFunction } from "./app";

export class JwtToken {
  public static verify(req: any, res: any, next: NextFunction) {
    const verifyToken = req.header("token");
    if (!verifyToken) {
      return forbidden("Access Denied, please check you are providing correct token", req.body, res);
    }
    try {
      const verified = AppFunction.jwtVerify(verifyToken);
      req.user = verified;
    } catch (error) {
      return forbidden("Please provide valid token", req.body, res);
    }
    const token = AppFunction.jwtVerify(req.header("token"));
    if(!token.code){
      return forbidden("Please provide valid token", token, res);
    }
    return next();
  }

  public static get(req: any): {code: string} {
    const verifyToken = req.header("token");
    return AppFunction.jwtVerify(verifyToken);
  }

  public static adminVerify(req: any, res: any, next: NextFunction) {
    const verifyToken = req.header("token");
    if (!verifyToken) {
      return forbidden("Access Denied, please check you are providing correct token", req.body, res);
    }
    try {
      const verified = AppFunction.jwtVerify(verifyToken);
      if(verified.role !== 2)
      {
        return forbidden("Access Denied", req.body, res);
      }
      req.user = verified;
    } catch (error) {
      return forbidden("Please provide valid token", req.body, res);
    }

    return next();
  }
}
