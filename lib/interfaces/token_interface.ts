import { Request} from "express";

export interface TokenInterface {
    token: string;
    id: number;
    username: string;
}

