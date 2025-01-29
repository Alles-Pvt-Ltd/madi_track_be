import { Request, Response } from 'express';
import { User } from '../../database/mysql/user';
import { successResponse, failureResponse, badResponse } from '../../core/response';
import { AppFunction } from '../../core/app';
import { IUser } from '../../core/interface/user';
import { validationResult } from 'express-validator';
import { StringConstant } from '../../config/constant';
import Helper from './helper';
import jwt from "jsonwebtoken";

export class UserController {
      // Login API
      public static async login(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ success: false, errors: errors.array() });
          return;
        }
    
        try {
          const { username, email, password } = req.body;
    
          const userResponse = await User.findUserByUsername(username, email);
    
          if (!userResponse || !userResponse.data) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
          }
    
          const user = userResponse.data;
    
          const isPasswordValid = await Helper.verifyPassword(password, user.password);
    
          if (!isPasswordValid) {
            res.status(401).json({ success: false, message: "Invalid password" });
            return;
          }
    
          const token = Helper.generateJwtToken(user.username, user.id, user.email);
    
          res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
          });
        } catch (error) {
          res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
      }
    
      // Register API
      public static async register(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                 res.status(400).json({ success: false, errors: errors.array() });
            }
    
            const { username, email, role, firstname, lastname, address, password, createdBy, parentId } = req.body;
    
            if (createdBy !== 1 && createdBy !== 2) {
                 res.status(400).json({
                    success: false,
                    message: "Invalid createdBy value. Only 1 (Admin) or 2 (User) are allowed.",
                });
            }
    
            if (parentId) {
                const parentExists = await User.findUserById(parentId);
                if (!parentExists) {
                   res.status(400).json({
                        success: false,
                        message: "Invalid parentId. Parent user does not exist.",
                    });
                }
            }
    
            const existingUserResponse = await User.findUserByUsername(username, email);
            if (existingUserResponse) {
                 res.status(400).json({
                    success: false,
                    message: "Username or email is already in use.",
                });
            }
    
            const encryptedPassword = await Helper.encryptPassword(password);
    
            const user = {
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
                parentId: parentId || null,
            };
    
            const registerResponse = await User.register(user);
    
            if (registerResponse.err) {
                 res.status(500).json({
                    success: false,
                    message: registerResponse.message,
                });
            }
    
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: registerResponse.data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later.",
            });
        }
      }    

    // Update User API
    public  updateUser = async(req: Request, res: Response)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badResponse(errors.array(), res);
        }

        const { id, role, firstname, lastname, address, email, password, updatedBy } = req.body;

        if(![1,2].includes(updatedBy)){
            return badResponse([{msg:'Invalid updatedBy Value.Only 1 or 2 are allowed.'}],res);
        }

        const existingUser = await User.getUserById(id);
        if(!existingUser){
            return badResponse([{msg:'User not found.please try Again.'}],res);
        }

        const user= {
            role,
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
        return successResponse(updateResponse.data, 'User updated successfully', res);
    }

    // Delete User API
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return Helper.failureResponse("Invalid user ID provided", res);
            }

            const userResponse = await User.getUserById(userId);
            if (userResponse.err) {
                return Helper.failureResponse(userResponse.message, res);
            }

            if (userResponse.data && userResponse.data[0]?.message === "User does not exist") {
                 res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'User ID not found',
                });
            }

            const user = userResponse.data[0];
            if (user && user.message === "User is already deleted") {
              res.status(200).json({
                    code: 200,
                    status: false,
                    message: 'The user has already been deleted',
                });
            }

            const deleteResponse = await User.deleteUser(userId);
            if (deleteResponse.err) {
                return Helper.failureResponse(deleteResponse.message, res);
            }

          res.status(200).json({
                code: 200,
                status: true,
                message: 'User deleted successfully, including associated family members.',
            });
        } catch (error) {
            return Helper.failureResponse("An unexpected error occurred", res);
        }
    };

    // Get All Users API
    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const usersResponse = await User.getAllUsers();

            if (usersResponse.err) {
                res.status(500).json({ success: false, message: usersResponse.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: usersResponse.data,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
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
    
            if (!userResponse.data || userResponse.data[0]?.message === "User does not exist") {
                return res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'Invalid Id',
                });
            }
            if ((userResponse.data[0]?.message || "").toLowerCase() === "user is deleted") {
                return res.status(200).json({
                    code: 200,
                    status: false,  
                    message: 'User is deleted',  
                });
            }
            if (userResponse.data[0]) {
                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: 'User Retrieved Successfully',
                    data: userResponse.data[0]
                });
            }

            return res.status(404).json({
                code: 404,
                status: false,
                message: 'No data available for the user.',
            });
        } catch (error) {
            return failureResponse("An unexpected error occurred", res);
        }
    };
}