import Mysql from "./connection";
import { IUser } from "../../core/interface/user";
import { IData } from "../../core/common/constant";

export class User {
    public static findUserByUsername = async (userName: string, email: string) => {
        let sqlQueryString = '';
        if (userName && email) {
            sqlQueryString = `CALL sp_findUserByUsername('${userName}', '${email}')`;
        } else if (userName) {
            sqlQueryString = `CALL sp_findUserByUsername('${userName}', NULL)`;
        } else if (email) {
            sqlQueryString = `CALL sp_findUserByUsername(NULL, '${email}')`;
        }
    
        const sqlData = await Mysql.connect(sqlQueryString, null);
    
        if (!sqlData.result || sqlData.result.length === 0 || sqlData.result[0].length === 0) {
            return { err: true, message: "User not found" };
        }
    
        return { err: false, data: sqlData.result[0][0] }; 
    };
    
    public static register = async (data: IUser) => {
        const insertUserQuery = `CALL sp_register(${data.role}, '${data.firstname}', '${data.lastname}', '${data.address}', '${data.username}', '${data.email}', '${data.password}', ${data.createdBy},${data.parentId})`;
    
        const result = await Mysql.connect(insertUserQuery, null);
    
        if (result.err) {
            return { err: true, message: result.result };
        }
        return { err: false, data: result.result[0] };
    };
    
    
    public static async updateUser(id: number, data: IUser, updatedBy: number) {
        const updateUserQuery = `CALL sp_updateUser(${data.role},'${data.firstname}','${data.lastname}','${data.address}','${data.email}','${data.password}',${updatedBy},${id},${data.parentId }) `;
        const sqlData = await Mysql.connect(updateUserQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    }
    
    public static async findUserById(id: number): Promise<{ err: boolean, data: any }> {
        const query = 'SELECT id, isDeleted FROM t_user WHERE id = ?';
        const result = await Mysql.connect(query, [id]);

        if (!result || !result.result.length) {
            return { err: true, data:null };
        }
    
        return { err: false, data: result.result[0] };
    }
    

    
    public static getAllUsers = async () => {
        const sqlQuery = `CALL sp_getAllUser()`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    };
    
    public static getUserById = async (id: number) => {
        const sqlQuery = `CALL sp_getUserById(${id})`;
        const sqlData = await Mysql.connect(sqlQuery, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    };

    public static deleteUser = async (id: number) => {
        const sqlQuery = `CALL sp_deleteUser(${id})`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
    
        return { err: false, data: sqlData.result[0] };
    };
    
}
