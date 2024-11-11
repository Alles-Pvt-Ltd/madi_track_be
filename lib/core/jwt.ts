import { NextFunction, Request, Response } from "express";
import { forbidden } from "./response";  // Ensure this function is implemented in your response.ts file
import { AppFunction } from "./app";  // Assuming AppFunction contains jwtVerify
const jwt = require('jsonwebtoken');

export class JwtToken {
  public static verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return forbidden("Access Denied: No token provided", req.body, res);
    }

    try {
      const verified = AppFunction.jwtVerify(token); 
    } catch (error) {
      return forbidden("Invalid token provided", req.body, res);
    }

    return next();
  }


  public static adminVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      return forbidden("Access Denied: No token provided", req.body, res);
    }

    try {
      const verified = AppFunction.jwtVerify(token); 

      
      if (verified.email) {  
        return forbidden("Access Denied: Admins only", req.body, res);
      }
 
    } catch (error) {
      return forbidden("Invalid token provided", req.body, res);
    }

    return next();
  }

  public static get(req: Request): { username: string, email: string } {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      throw new Error("Token is required");
    }
    const userData = AppFunction.jwtVerify(token);  
    return userData;
  }
}
