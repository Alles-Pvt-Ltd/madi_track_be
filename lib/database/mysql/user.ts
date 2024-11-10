import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IUser } from "../../core/interface/user";

export class User {
    public static findUserByUsername = async (username: string) => {
        const sqlQueryString = `CALL sp_findUserByUsername('${username}')`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };

    public static register = async (data: IUser) => {
        const insertUser = `CALL sp_register('${data.id}', '${data.username}', '${data.email}', '${data.password}', '${data.createdBy}', '${data.updatedBy}', '${data.isDeleted ? 1 : 0}')`;
        const sqlData = await Mysql.connect(insertUser, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
    };
}
