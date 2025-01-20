export interface IUser {
    role: number;
    firstname: string;
    lastname: string;
    address: string;
    username: string; 
    email: string;
    password: string;
    createdOn?: string;  
    updatedOn?: string;  
    updatedBy: number;
    createdBy?: number;  
    parentId?: number | null; 
}
