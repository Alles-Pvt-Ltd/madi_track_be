import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamilyTransfer, IReportData } from "core/interface/common";
import { IMember } from "core/interface/common";

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

    public static getAllFamilyTransfers = async () => {
        const sqlQueryString = `CALL sp_getAllFamilyTransfersForADsDivision ()`;

        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
            return { err: true, message : "Error Occur While Getting Family Transfer list"}
        }

        return { err: false, data: sqlData.result[0], message: "Family Transfer List Retrieved Successfuly"}
    }


    public static getMembersByFamilyId = async (familyId: number) => {
        const sqlQueryString = `CALL sp_getMembersByFamilyId(${familyId})`;
    
        const sqlData = await Mysql.connect(sqlQueryString, null);
    
        // Log the SQL result to debug the data returned from the database
        console.log("SQL Data Result: ", sqlData.result);  // <-- Add this line
    
        if (sqlData.err) {
            return { err: true, message: "Error Occur While Getting Members List" };
        }
        return { err: false, data: sqlData.result[0], message: "Members List Successfully Retrieved" };
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

    public static generateReport = async (reportData: IReportData) => {
        const sqlQueryString = `CALL sp_generateReport (
            ${reportData.searchText !== null ? `'${reportData.searchText}'` : "null"},
            ${reportData.gsDivisionId}, 
            ${reportData.villageId}, 
            ${reportData.ageFrom},
            ${reportData.ageTo},
            ${reportData.occupationId}, 
            ${reportData.jobStatusId}, 
            ${reportData.genderId}, 
            ${reportData.isMarried}, 
            ${reportData.religion},
            ${reportData.isDeath}, 
            ${reportData.deathFromDate !== null ? `'${reportData.deathFromDate}'` : "null"}, 
            ${reportData.deathEndDate !== null ? `'${reportData.deathEndDate}'` : "null"})`;
            
        const sqlData = await Mysql.connect(sqlQueryString, null);

        if(sqlData.err)
        {
            return { err: true, message : "Error Occur While Getting Report"}
        }

        return { err: false, data: sqlData.result}
    }
}