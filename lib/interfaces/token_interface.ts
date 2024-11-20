import { Request} from "express";

export interface TokenInterface {
    token: string;
    userId: number;
    username: string;
}

