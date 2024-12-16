import { AppFunction } from "../../core/app";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class Helper {
   public static async passwordVerify(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;  
    }
}

}
