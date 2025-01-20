import { Request, Response } from 'express';
import { User } from '../../database/mysql/user';
import { successResponse, failureResponse, badResponse } from '../../core/response';
import { AppFunction } from '../../core/app';
import { IUser } from '../../core/interface/user';
import { validationResult } from 'express-validator';
import Helper from "./helper";

export class UserController {
    // Login API
    public static async login(req: Request, res: Response): Promise<void> {
        if (!Helper.validateRequest(req, res)) return;

        try {
            const { username, email, password } = req.body;
            const userResponse = await User.findUserByUsername(username, email);

            if (!userResponse || userResponse.err || !userResponse.data) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            const user = userResponse.data;
            const isPasswordValid = await Helper.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ success: false, message: 'Invalid password' });
                return;
            }

            const token = Helper.generateJwtToken(user.username, user.id, user.email);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
    }

    // Register API
    public static async register(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
    
        try {
            const { username, email, role, firstname, lastname, address, password, createdBy, parentId, updatedBy } = req.body;
    
            if (!parentId) {
                res.status(400).json({ success: false, message: 'parentId is required.' });
                return;
            }
    
            if (![1, 2].includes(createdBy)) {
                res.status(400).json({ success: false, message: 'Invalid createdBy value. Only 1 or 2 are allowed.' });
                return;
            }
    
            const parentUserCheck = await User.findUserById(parentId); 
            console.log('Parent User Check:', parentUserCheck);

            if (parentUserCheck.err || !parentUserCheck.data || parentUserCheck.data.isDeleted) {
            res.status(400).json({ success: false, message: 'Invalid parentId. Parent user does not exist or is deleted.' });
            return;
            }

    
            const existingUserResponse = await User.findUserByUsername(username, email);
            if (existingUserResponse && !existingUserResponse.err && existingUserResponse.data) {
                res.status(400).json({ success: false, message: 'Username or email is already in use.' });
                return;
            }
    
            const encryptedPassword = await AppFunction.encryptPassword(password);
    
            const user: IUser = {
                role: parseInt(role, 10),
                firstname,
                lastname,
                address,
                username,
                email,
                password: encryptedPassword,
                createdOn: new Date().toISOString(),
                updatedOn: new Date().toISOString(),
                createdBy,
                parentId,
                updatedBy: updatedBy || 1,
            };
    
            const registerResponse = await User.register(user);
            if (registerResponse.err) {
                res.status(500).json({ success: false, message: registerResponse.message });
                return;
            }
    
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: registerResponse.data,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
    }
    
    // Update User API
    public static async updateUser(req: Request, res: Response): Promise<void> {
        if (!Helper.validateRequest(req, res)) return;

        const { id, role, firstname, lastname, address, email, password, parentId, updatedBy, username } = req.body;

        if (![1, 2].includes(updatedBy)) {
            return badResponse([{ msg: 'Invalid updatedBy value. Only 1 or 2 are allowed.' }], res);
        }

        if (id === parentId) {
            return badResponse([{ msg: 'User and parent cannot be the same.' }], res);
        }

        const encryptedPassword = password ? await AppFunction.encryptPassword(password) : null;

        const userData: IUser = {
            role,
            firstname,
            lastname,
            address,
            username,
            email,
            password: encryptedPassword,
            parentId: parentId,
            updatedBy,
            updatedOn: new Date().toISOString(),
        };

        const updateResponse = await User.updateUser(id, userData, updatedBy);

        if (updateResponse.err) {
            return failureResponse(updateResponse.message, res);
        }

        return successResponse(updateResponse.data, 'User updated successfully', res);
    }

    // Get All Users API
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const allUsersResponse = await User.getAllUsers();
        if (allUsersResponse.err) {
            return failureResponse(allUsersResponse.message, res);
        }

        return successResponse(allUsersResponse.data, 'All Users Got Successfully', res);
    }

    // Get User by ID API
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
    
            if (isNaN(userId)) {
                 res.status(400).json({
                    code: 400,
                    status: false,
                    message: "Invalid user ID provided",
                });
            }
    
            const userResponse = await User.getUserById(userId);
    
            if (userResponse.err) {
                 res.status(500).json({
                    code: 500,
                    status: false,
                    message: userResponse.message || "Internal server error",
                });
            }
    
            const userMessage = userResponse.data[0]?.message?.toLowerCase();
    
            if (userMessage === "user does not exist or is deleted") {
                res.status(404).json({
                    code: 404,
                    status: false,
                    message: "User not found or deleted",
                });
            }
    
            if (userMessage === "user exists but is marked as deleted") {
                 res.status(200).json({
                    code: 200,
                    status: false,
                    message: "User is deleted",
                });
            }
    
            if (userResponse.data[0]) {
                 res.status(200).json({
                    code: 200,
                    status: true,
                    message: "User retrieved successfully",
                    data: userResponse.data[0],
                });
            }
    
             res.status(404).json({
                code: 404,
                status: false,
                message: "No data available for the user",
            });
        } catch (error) {
             res.status(500).json({
                code: 500,
                status: false,
                message: "An unexpected error occurred: " + error.message,
            });
        }
    };
    
    
    // Delete User API
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return badResponse([{ msg: 'Invalid user ID.' }], res);
            }

            const deleteResponse = await User.deleteUser(userId);
            if (deleteResponse.err) {
                return failureResponse(deleteResponse.message, res);
            }

            return successResponse(deleteResponse, 'User and related child users deleted successfully.', res);
        } catch (error) {
            return failureResponse('Internal server error.', res);
        }
    }
}