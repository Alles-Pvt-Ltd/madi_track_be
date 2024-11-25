import { Request, Response, NextFunction } from "express"; 
import { forbidden } from "./response"; 
import { AppFunction } from "./app"; 

const jwt = require('jsonwebtoken');

export class JwtToken { 
  public static verify(req: Request, res: Response, next: NextFunction) { 
    const token = req.headers['token']?.toString();  

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

  public static get(req: Request): { username: string, email: string } { 
    const token = req.headers['token']?.toString();  

    if (!token) { 
      throw new Error("Token is required"); 
    } 

    const userData = AppFunction.jwtVerify(token);  
    return userData; 
  } 
}
