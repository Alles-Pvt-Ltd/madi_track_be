import { Request, Response } from "express";
import { User } from "../../database/mysql/user";
import { badResponse, failureResponse, successResponse } from "../../core/response";
import { AppFunction } from "../../core/app";
import Helper from "./helper";
import { StringConstant } from "../../config/constant";
import { IUser } from "../../core/interface/user";
import { validationResult } from "express-validator";

export class UserController {
    public login = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }

        const { username, password } = req.body;
        const loginResponse = await User.findUserByUsername(username);

        if (loginResponse.err || loginResponse.data.length === 0) {
            return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }

        const user = loginResponse.data[0];
        if (!AppFunction.passwordVerify(password, user.password)) {
            return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }

        // Generate and return JWT token
        const token = Helper.getToken(user.username, user.id);
        return successResponse({ token }, "Login successful", res);
    };

    public register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }

        const body = req.body as IUser;
        if (body.password === '') {
            return failureResponse("Password cannot be empty!", res);
        }

        const user = await User.findUserByUsername(body.username);
        if (!body.id && user.data.length > 0) {
            return failureResponse("User already exists", res);
        }

        body.id = body.id || 0;
        body.password = AppFunction.encryptPassword(body.password);

        const registerResponse = await User.register(body);
        if (registerResponse.err) {
            return failureResponse(registerResponse.message, res);
        }

        return successResponse(registerResponse.data, "User registered successfully", res);
    };
}
