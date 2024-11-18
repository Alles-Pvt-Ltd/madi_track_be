import { Request, Response } from "express";
import { User } from "../../database/mysql/user";
import { badResponse, failureResponse, successResponse } from "../../core/response";
import { AppFunction } from "../../core/app";
import { IUser } from "../../core/interface/user";
import { validationResult } from "express-validator";
import { StringConstant } from "../../config/constant";
import { JwtToken } from "../../core/jwt";

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
        if (loginResponse.data.length === 0) {
            return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }
        if (!AppFunction.passwordVerify(req.body.password, loginResponse.data[0].password)) {
            return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }
    
        return successResponse(loginResponse.data[0], "Login successful", res);
    };
    

    public register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }

        const body: IUser = {
            role: parseInt(req.body.role, 10) || 0,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            address: req.body.address,
            username: req.body.username,
            email: req.body.email,
            password: AppFunction.encryptPassword(req.body.password),
            createdOn: new Date().toISOString(),
            updatedOn: new Date().toISOString()
        };

        const registerResponse = await User.register(body);
        if (registerResponse.err) {
            return failureResponse(registerResponse.message, res);
        }

        return successResponse(registerResponse.data, "User Registered Successfully", res);
    };

    public updateUser = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }

        const { id, role, firstname, lastname, address, email, password, updatedBy } = req.body;

        const userData: IUser = {
            role,
            firstName: firstname,
            lastName: lastname,
            address,
            username: email,
            email,
            password: AppFunction.encryptPassword(password),
            createdOn: "",  
            updatedOn: new Date().toISOString()
        };

        const updateResponse = await User.updateUser(id, userData, updatedBy);
        if (updateResponse.err) {
            return failureResponse(updateResponse.message, res);
        }

        return successResponse(updateResponse.data, "User Updated Successfully", res);
    };

    public getAllUsers = async (req: Request, res: Response) => {
        const allUsersResponse = await User.getAllUsers();
        if (allUsersResponse.err) {
            return failureResponse(allUsersResponse.message, res);
        }

        return successResponse(allUsersResponse.data, "All Users Retrieved Successfully", res);
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id, 10);
    
        if (isNaN(userId)) {
            return badResponse([{ msg: "Invalid user ID" }], res);
        }
    
        const userResponse = await User.getUserById(userId);
        if (userResponse.err) {
            return failureResponse(userResponse.message, res);
        }
    
        return successResponse(userResponse.data, "User Retrieved Successfully", res);
    };
    
    public deleteUser = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id, 10);
        const token = req.headers.token?.toString();

        if (!token) {
            return badResponse([{ msg: "No token provided" }], res);
        }

        let decoded: any;
        try {
            decoded = AppFunction.jwtVerify(token);  
        } catch (error) {
            return badResponse([{ msg: "Invalid token" }], res);
        }

        const deleteResponse = await User.deleteUser(userId);
        if (deleteResponse.err) {
            return failureResponse(deleteResponse.message, res);
        }

        return successResponse(deleteResponse.data, "User Deleted Successfully", res);
    };
    
}
