import { Request, Response } from 'express';
import { User } from '../../database/mysql/user';
import { successResponse, failureResponse, badResponse } from '../../core/response';
import { AppFunction } from '../../core/app';
import { IUser } from '../../core/interface/user';
import { validationResult } from 'express-validator';
import { StringConstant } from '../../config/constant';
import Helper from './helper';
import * as jwt from 'jsonwebtoken';

export class UserController {
      // Login API
    public static async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
    }

    try {
        const loginResponse = await User.findUserByUsername(req.body.username, req.body.email);
        if (loginResponse.err) {
            return failureResponse(loginResponse.message, res);
        }

        const user = loginResponse.data;
        if (!user || Object.keys(user).length === 0) {
            return failureResponse(StringConstant.usernamePasswordMismatch, res);
        }

        const token = AppFunction.createJwtToken(user.username, user.id, user.email);

        return successResponse(token, "Login successful", res);
    } catch (error) {
        return failureResponse("Internal server error: " + error.message, res);
    }
}

// Register User API
public static async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
    }

    const { username, email, role, firstname, lastname, address, password, parentId, createdBy } = req.body;

    if (parentId) {
        const parentExists = await User.findUserById(parentId);
        if (!parentExists) {
            return failureResponse("Invalid parentId. Parent user does not exist.", res);
        }
    }

    const existingUserResponse = await User.findUserByUsername(username, email);
    if (!existingUserResponse.err) {
        return failureResponse("Username or email is already in use.", res);
    }

    const encryptedPassword = await AppFunction.encryptPassword(password);

    const user = {
        role: parseInt(role, 10),
        firstname,
        lastname,
        address,
        username,
        email,
        password: encryptedPassword,
        createdBy: createdBy || 1, 
        parentId: parentId || null,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
    };

    const registerResponse = await User.register(user);

    if (registerResponse.err) {
        return failureResponse(registerResponse.message, res);
    }

    return successResponse(registerResponse.data, "User registered successfully", res);
}

// Update User API
public updateUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
    }

    const { id, role, firstname, lastname, address, email, password, updatedBy, parentId } = req.body;

    const existingUser = await User.getUserById(id);
    if (!existingUser) {
        return failureResponse("User not found. Please try again.", res);
    }

    if (parentId) {
        const parentExists = await User.findUserById(parentId);
        if (!parentExists) {
            return failureResponse("Invalid parentId. Parent user does not exist.", res);
        }
    }

    const user = {
        role: parseInt(role, 10),
        firstname,
        lastname,
        address,
        username: email,
        email,
        password: await AppFunction.encryptPassword(password),
        createdOn: '',
        updatedOn: new Date().toISOString(),
        createdBy: updatedBy
    };

    const updateResponse = await User.updateUser(id, user, updatedBy);
    if (updateResponse.err) {
        return failureResponse(updateResponse.message, res);
    }
    
    return res.send({
        code: 200,
        status: true,
        message: "User updated successfully"
    });
};

// Delete User API
public static async deleteUser(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
    }

    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return failureResponse("Invalid user ID provided", res);
    }

    const userResponse = await User.getUserById(userId);
    if (userResponse.err) {
        return failureResponse(userResponse.message, res);
    }

    // Check if userResponse.data exists and has data
    if (!userResponse.data || userResponse.data.length === 0) {
        return failureResponse("User not found", res);
    }

    const user = userResponse.data[0];

    if (user && user.message === "User does not exist") {
        return failureResponse("User not found", res);
    }

    if (user && user.message === "User is deleted") {
        return successResponse(null, "User already deleted", res);
    }

    const deleteResponse = await User.deleteUser(userId);
    if (deleteResponse.err) {
        return failureResponse(deleteResponse.message, res);
    }

    return successResponse(null, "User deleted successfully", res);
}


// Get All Users API
   
public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const usersResponse = await User.getAllUsers();

        if (usersResponse.err) {
            return failureResponse(usersResponse.message, res);
        }

        return successResponse(usersResponse.data, "Users fetched successfully", res);
    } catch (error) {
        return failureResponse("An unexpected error occurred: " + error.message, res);
    }
}

// Get User By ID API
public getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return failureResponse("Invalid user ID provided", res);
        }

        const userResponse = await User.getUserById(userId);

        if (userResponse.err) {
            return failureResponse(userResponse.message, res);
        }

        const userData = userResponse.data[0];

        if (!userData || userData.message === "User does not exist") {
            return failureResponse("Invalid ID", res);
        }

        if ((userData.message || "").toLowerCase() === "user is deleted") {
            return failureResponse("User is deleted", res);
        }

        return successResponse(userData, "User Retrieved Successfully", res);
    } catch (error) {
        return failureResponse("An unexpected error occurred: " + error.message, res);
    }
};
}