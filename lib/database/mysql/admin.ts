import Mysql from "./connection";
import { IData } from "../../core/common/constant";

export class Admin {
    public static getAllGsList = async () => {
        const sqlQueryString = `CALL sp_getAllGSList ()`;
        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
            return { err: true, message: "Error Occur While Getting GS List" } as IData;
        }

        return { err: false, data: sqlData.result[0], message: "GS List Successfully Retrieved"}
    }

    public static getAllFamilies = async (divisionId: number) => {
        const gsDivisionId = divisionId !== null ? `${divisionId}` : "null";
        const sqlQueryString = `CALL sp_getAllFamilies (${gsDivisionId})`;

        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
            return { err: true, message : "Error Occur While Getting Family List"}
        }

        return { err: false, data: sqlData.result[0], message: "Family List Retrieved Successfuly"}
    }
}