import Mysql from "./connection";
import { IUser } from "../../core/interface/user";
import { IData } from "../../core/common/constant";

export class User {
    public static findUserByUsername = async (userName: string) => {
        const sqlQueryString = `CALL sp_findUserByUsername ('${userName}')`;  // Use stored procedures safely.
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };

    public static register = async (data: IUser) => {
        const insertUser = `CALL sp_register(NULL, ${data.role}, '${data.firstName}', '${data.lastName}', '${data.address}', '${data.username}', '${data.email}', '${data.password}')`;
        
        const sqlData = await Mysql.connect(insertUser, null);
        
        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    };

    public static updateUser = async (id: number, data: IUser, updatedBy: number) => {
        const updatedOn = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const updateUserQuery = `
            CALL sp_updateUser(${data.role}, '${data.firstName}','${data.lastName}','${data.address}', '${data.email}', '${data.password}', ${updatedBy}, '${updatedOn}', ${id} )`;

        const sqlData = await Mysql.connect(updateUserQuery, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result[0] };
    };

    public static getAllUsers = async () => {
        const sqlQuery = `CALL sp_getAllUser()`;
        const sqlData = await Mysql.connect(sqlQuery, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result };
        }
        return { err: false, data: sqlData.result };
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
