import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppFunction } from '../../core/app';
import { validationResult } from 'express-validator';

export default class Helper {
    public static validateRequest(req: Request, res: Response): boolean {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return false;
        }
        return true;
    }

    public static async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        return await AppFunction.passwordVerify(inputPassword, storedPassword);
    }

    public static generateJwtToken(username: string, userId: number, email: string): string {
        return AppFunction.createJwtToken(username, userId, email);
    }
}
