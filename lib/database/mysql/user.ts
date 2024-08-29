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
      return { err: false, data: sqlData.result[0] } as IData;
    };

    public static register = async (data: IUser) => {
      const insertUser = `CALL sp_register ('${data.code}','${data.firstName}', '${data.lastName}', '${data.userName}', '${data.password}', '${data.role}',${data.gsDivisionId})`;
      const sqlData = await Mysql.connect(insertUser, null);

      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData;
    }

    public static getUserByCode = async (code: string) => {
      let relatedQuery = `CALL sp_getUserByCode ('${code}')`;
  
      const sqlData = await Mysql.connect(relatedQuery, null);
  
      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result[0] } as IData;
    };

    public static reference = async () => {
      const sqlQueryString = `CALL sp_reference ()`;
      const sqlData = await Mysql.connect(sqlQueryString, null);
  
      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData;
    };

    public static changePassword = async (code: string, password: string) => {
      const sqlQueryString = `UPDATE t_user SET password='${password}' WHERE code='${code}'`;
      const sqlData = await Mysql.connect(sqlQueryString, null);
  
      if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
      return {
        err: false,
        data: sqlData.result,
        message: "Password changed successfully",
      } as IData;
    };

    public static getUserDivision = async (userId: number) => {
      const sqlQueryString = `CALL sp_userDetails (${userId})`;
      const sqlData = await Mysql.connect(sqlQueryString, null);

      if(sqlData.err)
      {
        return { err: true, message: sqlData.result } as IData;
      }
      return { err: true, data: sqlData.result}
    }
}