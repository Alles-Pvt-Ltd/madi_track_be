import { AppFunction } from "../../core/app";

export default class Helper {
    public static getToken(username: string, role: number): { token: string } {
        if (!Number.isInteger(role)) {
            throw new Error("Role must be an integer");
        }
        const token = AppFunction.createJwtToken(username, role);
        return { token };
    }
    
}
