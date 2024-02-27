import { NextFunction } from "express";
import { forbidden } from "../modules/common/service";
import { AppFucntion } from "../app/app_function";

export class Verify{

    public verify(req:any,res:any,next:NextFunction){
        
        const verifyToken=req.header('auth_token');//when we login we store token in header in the name of auth_token,so we get token from header
        
        // if verify token not in header
        if (!verifyToken) {
            return forbidden('Access Denited',req.body,res);
        }

        try {
        // if we have token in header that we are going to verify 
            const verified=AppFucntion.jwtVerify(verifyToken);
            
             req.user=verified;
            // we store verified value in to res.user ,here verified will have the user id because when we create token we gave user id in login 
            // req.user:<any>=verified;
        } catch (error) {
            // invalid token
          return forbidden('in valid token',req.body,res);

        }
        return next();
    }
}

