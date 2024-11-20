import { Request, Response } from "express";
import { User } from "../../database/mysql/user";
import { successResponse, failureResponse, badResponse } from "../../core/response";
import { AppFunction } from "../../core/app";
import { IUser } from "../../core/interface/user";
import { validationResult } from "express-validator";
import { StringConstant } from "../../config/constant";
import Helper from "./helper";

export class UserController {

    public async login(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }
    
        const { username, password } = req.body;
        const loginResponse = await User.findUserByUsername(username);
    
        if (loginResponse.err || loginResponse.data.length === 0) {
            return failureResponse("Invalid username or password", res);
        }
    
        const isPasswordValid = await AppFunction.passwordVerify(password, loginResponse.data[0].password);
        if (!isPasswordValid) {
            return failureResponse("Invalid username or password", res);
        }
    
        const { role } = loginResponse.data[0]; 
        if (!Number.isInteger(role)) {
            return failureResponse("User role is invalid", res);
        }
    
        return successResponse(
            Helper.getToken(username, role),
            "Login successful",
            res
        );
    }
    
    
      public async register(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return badResponse(errors.array(), res);
        }
    
        const body: IUser = {
          role: parseInt(req.body.role, 10),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          username: req.body.username,
          email: req.body.email,
          password: await AppFunction.encryptPassword(req.body.password),
          createdOn: new Date().toISOString(),
          updatedOn: new Date().toISOString(),
        };
    
        const registerResponse = await User.register(body);
    
        if (registerResponse.err) {
          return failureResponse(registerResponse.message, res);
        }
    
        return successResponse(registerResponse.data, "User registered successfully", res);
      }
    
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

        const userResponse = await User.getUserById(userId);
        if (userResponse.err) {
            return failureResponse(userResponse.message, res);
        }

        return successResponse(userResponse.data, "User Retrieved Successfully", res);
    };

    public deleteUser = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id, 10);

        const deleteResponse = await User.deleteUser(userId);
        if (deleteResponse.err) {
            return failureResponse(deleteResponse.message, res);
        }

        return successResponse(deleteResponse.data, "User Deleted Successfully", res);
    };
}
