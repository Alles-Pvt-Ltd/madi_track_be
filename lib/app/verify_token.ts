import { NextFunction, Request, Response } from "express";
import { forbidden } from "../modules/common/service";
import { AppFunction } from "../app/app_function";

declare global {
  namespace Express {
    export interface Request {
      user?: { username: string; email: string }; 
    }
  }
}

export class Verify {
  public verify(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("token");
    if (!token) {
      return forbidden("Access Denied", req.body, res);
    }

    const verified = AppFunction.jwtVerify(token);
    if (!verified) {
      return forbidden("Invalid token", req.body, res);
    }

    req.user = verified;
    next();
  }
}
