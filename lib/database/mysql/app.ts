import { IData } from "../../core/common/constant";
import Mysql from "./connection";

export class App {
    public static getAppVersion = async (version: number) => {
        const sqlQueryString = `SELECT * FROM t_appVersion WHERE version > ${version}`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
        return { err: true, message: "Version not found" } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
    }
}