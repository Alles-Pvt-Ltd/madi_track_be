import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IUser } from "core/interface/user";

export class User {

    public static findUserByUsername = async (userName: string) => {
      const sqlQueryString = `CALL sp_findUserByUsername ('${userName}')`;
      const sqlData = await Mysql.connect(sqlQueryString, null);

      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData;
    };

    public static login = async (userName: string) => {
        const sqlQueryString = `CALL sp_login ('${userName}')`;
        const sqlData = await Mysql.connect(sqlQueryString, null);
        // console.log("Sql data : ",sqlData.result[0]);
        if (sqlData.err) {
          return { err: true, message: "Database Error" } as IData;
        }
        if (sqlData.result.length === 0) {
          return { err: true, message: "Unable to find the user"} as IData;
        }

        return {err: false, data: sqlData.result[0]} as IData;
    }
    public static register = async (data: IUser) => {
      const insertUser = `CALL sp_register ('${data.code}','${data.firstName}', '${data.lastName}', '${data.userName}', '${data.password}', '${data.role}',${data.gsDivisionId})`;
      const sqlData = await Mysql.connect(insertUser, null);

      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData;
    }
}