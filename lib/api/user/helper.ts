import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
export default class Helper {

    public static async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(inputPassword, storedPassword);
        } catch (err) {
            console.error('Error in verifyPassword:', err);
            return false;
        }
    }
}
