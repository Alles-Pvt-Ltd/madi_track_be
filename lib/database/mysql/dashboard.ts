import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily } from "core/interface/common";

export class Dashboard {
    public static getFamiliesCount = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getFamiliesCount(${divisionId})`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }

    public static getChildrenCount = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getChildrenCount(${divisionId})`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }

    public static getEldersCount = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getEldersCount(${divisionId})`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }

    public static getGovernmentEmployeesCount = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getGovernmentEmployeesCount(${divisionId})`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }

    public static getUniversityStudentsCount = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getUniversityStudentsCount(${divisionId})`;
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }
}