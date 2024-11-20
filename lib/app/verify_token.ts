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
  public verify(req: Request, res: Response, next: NextFunction) {
    const verifyToken = req.header('token'); 

    if (!verifyToken) {
      return forbidden('Access Denied', req.body, res);
    }

    try {
      const verified = AppFunction.jwtVerify(verifyToken);
      req.user = verified;  
    } catch (error) {
      return forbidden('Invalid token', req.body, res);
    }

    return next();
  }
}
