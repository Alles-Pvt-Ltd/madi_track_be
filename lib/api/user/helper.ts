import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
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
    public static failureResponse(message: string, res: Response): void {
        res.status(500).json({ success: false, message });
    }

    public static async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(inputPassword, storedPassword);
        } catch (err) {
            console.error('Error in verifyPassword:', err);
            return false;
        }
    }
}
