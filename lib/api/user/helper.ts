import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
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

    public static async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
        try {
            if (storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2a$')) {
                return await bcrypt.compare(inputPassword, storedPassword);
            }
            if (storedPassword.startsWith('sha1$')) {
                const parts = storedPassword.split('$');
                if (parts.length >= 3) {
                    const [prefix, salt, ...hashParts] = parts;
                    const hash = hashParts.join('$');
                    const sha1Hash = crypto.createHash('sha1').update(salt + inputPassword).digest('hex');
                    return sha1Hash === hash;
                }
            }
            console.error('Unsupported password format');
            return false;
        } catch (err) {
            return false;
        }
    }

    public static async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    public static generateJwtToken(username: string, userId: number, email: string): string {
        return jwt.sign(
            { username, userId, email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );
    }
    public static async generateUniqueFamilyId(): Promise<string> {
        try {
            const familyId = crypto.randomBytes(8).toString('hex'); // Generate a random 16-character hex string
            return familyId;
        } catch (error) {
            throw new Error('Failed to generate unique family ID');
        }
    }
}
