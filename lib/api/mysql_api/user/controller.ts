import { Request, Response } from "express";
import { User } from "../../../database/mysql/user";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { AppFunction } from "../../../core/app";
import Helper from "./helper";
import { StringConstant } from "../../../config/constant";
import {IUser} from "../../../core/interface/user"
import { validationResult } from "express-validator";

export class UserController {
    public login = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return badResponse(errors.array(), res);
        }

        const loginResponse = await User.findUserByUsername(req.body.userName);
        if (loginResponse.err) {
          return failureResponse(loginResponse.message, res);
        }
    
        if (
          !AppFunction.passwordVerify(
            req.body.password,
            loginResponse.data[0].password
          )
        ) {
          return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }
  
        return successResponse(Helper.loginResponse(loginResponse.data[0]), "Login successfull", res);
    };

    public register = async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
      }

      const body = req.body as IUser;

      const user = await User.findUserByUsername(body.userName);
      if (user.err) {
        return failureResponse(user.message, res);
      }
      if(user.data.length > 0)
      {
        return failureResponse("User already exist", res);
      }
      body.code = AppFunction.uuid();
      body.password = AppFunction.encryptPassword(body.password);

      const register = await User.register(body);
      if(register.err)
      {
        return failureResponse(register.message, res);
      }

      return successResponse(register.data, "User Registered Successfully", res);

    }
}