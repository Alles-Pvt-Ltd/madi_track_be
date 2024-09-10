import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamilyTransfer } from "core/interface/common";

export class Admin {
    public static getAllGsList = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getAllGSList (${divisionId})`;
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

    public static getAllFamilyTransfers = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getAllFamilyTransfersForADsDivision (${divisionId})`;

        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
            return { err: true, message : "Error Occur While Getting Family Transfer list"}
        }

        return { err: false, data: sqlData.result[0], message: "Family Transfer List Retrieved Successfuly"}
    }

    public static transferAcceptOrRejectByDs = async (data: IFamilyTransfer) => {
        const sqlQueryString = `CALL sp_acceptOrRejectFamilyTransferByDs (${data.id},${data.status})`;

        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
            return { err: true, message : "Error Occur While Updating Transfer Status"}
        }
    
        return { err: false, data: sqlData.result[0], message: "Family Transfer Status Updated Successfully"}
    }
}