export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdBy: number;
    updatedBy: number;
    isDeleted: number;
}