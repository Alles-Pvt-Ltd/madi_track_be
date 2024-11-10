import { NextFunction, Request, Response } from "express";
import { forbidden } from "./response";  // Ensure this function is implemented in your response.ts file
import { AppFunction } from "./app";  // Assuming AppFunction contains jwtVerify
const jwt = require('jsonwebtoken');

export class JwtToken {
  // Standard JWT Token Verification
  public static verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract "Bearer <token>"

    if (!token) {
      return forbidden("Access Denied: No token provided", req.body, res);
    }

    try {
      const verified = AppFunction.jwtVerify(token); // Verifies the token with the secret
     // Attach the decoded data to req.user for future middleware or request handling
    } catch (error) {
      return forbidden("Invalid token provided", req.body, res);
    }

    return next();
  }

  // Admin-specific JWT Token Verification
  public static adminVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract "Bearer <token>"

    if (!token) {
      return forbidden("Access Denied: No token provided", req.body, res);
    }

    try {
      const verified = AppFunction.jwtVerify(token); // Verifies the token with the secret

      // Check if the user has admin role (assuming role is part of the payload)
      if (verified.email) {  // Assuming role 2 is for admin
        return forbidden("Access Denied: Admins only", req.body, res);
      }
 // Attach the decoded data to req.user for future middleware or request handling
    } catch (error) {
      return forbidden("Invalid token provided", req.body, res);
    }

    return next();
  }

  // Function to extract user data from the token (e.g., user code)
  public static get(req: Request): { username: string, email: string } {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      throw new Error("Token is required");
    }

    // Return decoded user data from JWT token
    const userData = AppFunction.jwtVerify(token);  // Using AppFunction.jwtVerify to decode token and get user info
    return userData;
  }
}
