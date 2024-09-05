import { Request, Response } from "express";
import { User } from "../../../database/mysql/user";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { AppFunction } from "../../../core/app";
import Helper from "./helper";
import { StringConstant } from "../../../config/constant";
import {IUser} from "../../../core/interface/user"
import { validationResult } from "express-validator";
import { JwtToken } from "../../../core/jwt";

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
        if(loginResponse.data.length === 0)
        {
          return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }
        if (!AppFunction.passwordVerify(req.body.password, loginResponse.data[0][0].password) )
        {
          return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }
        return successResponse(Helper.getToken(loginResponse.data[0][0].code), "Login successfull", res);
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
      if(user.data[0].length > 0)
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

    public reference  = async (req: Request, res: Response) => {
      const responseData = await User.reference();

      const referenceData = {
        genderReference: responseData.data[0],
        familyRoleReference: responseData.data[1],
        occupationReference: responseData.data[2],
        gsDivisions: responseData.data[3]
      }

      return successResponse(referenceData,"Successfully retrieved",res);
    }

    public changePassword = async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
      }
      const jwtData = JwtToken.get(req);
      const userInfo = await User.getUserByCode(jwtData.code);
      if (userInfo.err) {
        return failureResponse(userInfo.message, res);
      }
      if (
        !AppFunction.passwordVerify(
          req.body.oldPassword,
          userInfo.data[0].password
        )
      ) {
        return failureResponse("Password not match", res);
      }
  
      const changedPassword = await User.changePassword(
        jwtData.code,
        AppFunction.encryptPassword(req.body.newPassword)
      );
      if (changedPassword.err) {
        return failureResponse(changedPassword.message, res);
      }
  
      return successResponse(changedPassword.data, changedPassword.message, res);
    };

    public userInfo = async (req: Request, res: Response) => {
      const jwtData = JwtToken.get(req);
      const userInfo = await User.getUserByCode(jwtData.code);
      if (userInfo.err) {
        return failureResponse(userInfo.message, res);
      }

      const userDetail = await User.userInfo(userInfo.data[0].id);
      if(userDetail.err)
      {
        return failureResponse("Error Occur, UserDetails Not Found", res)
      }
      return successResponse(Helper.userResponse(userDetail.data), userDetail.message, res);
    }
}