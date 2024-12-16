import { NextFunction, Request, Response } from "express";
import { forbidden } from "../modules/common/service";  
import { AppFunction } from "../app/app_function";

declare global {
  namespace Express {
    interface Request {
      user?: any;  
    }
  }
}

export class Verify {
  public verify(req: Request, res: Response, next: NextFunction) {
    const token = req.header('token'); // Use `req.header` to retrieve the token

    if (!token) {
        return forbidden("Access Denied: No token provided", req.body, res);
    }

    try {
        const verified = AppFunction.jwtVerify(token); // Verify the token using AppFunction.jwtVerify
        if (!verified) {
            return forbidden("Invalid token provided", req.body, res);
        }
        req.user = verified; // Attach the verified user data to the request object
    } catch (error) {
        return forbidden("Invalid token provided", req.body, res);
    }

    next();
  }
}
