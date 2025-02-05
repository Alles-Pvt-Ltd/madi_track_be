import Mysql from "./connection";
import { IData } from "../../core/common/constant";


export class MedicalHistory {
    public static addMedicalHistory = async (userId: number,treatmentDate: string,treatmentType: string, location: string, reportFileUrl: string,createdBy: number) => {
        try {
            if (!reportFileUrl) {
                throw new Error("Report file URL is required");
            }
            const sqlQueryString = `CALL sp_addMedicalHistory(${userId}, '${treatmentDate}', '${treatmentType}', '${location}', '${reportFileUrl}', ${createdBy})`;
            const sqlData = await Mysql.connect(sqlQueryString, null);
    
            if (sqlData.err) {
                return { err: true, message: sqlData.result } as IData;
            }
    
            return { err: false, data: sqlData.result[0] } as IData;
        } catch (error) {
            return { err: true, message: "Database error: " + error.message } as IData;
        }
    };
    
    public static updateMedicalHistory = async (hid: number,userId: number,treatmentDate: string,treatmentType: string,location: string,reportFileUrl: string | null,updatedBy: number ): Promise<IData> => {
        try {
            const sqlQueryString = `CALL sp_updateMedicalHistory(${hid},${userId},'${treatmentDate}','${treatmentType}', '${location}',${reportFileUrl ? `'${reportFileUrl}'` : "NULL"}, ${updatedBy})`;
            const sqlData = await Mysql.connect(sqlQueryString, null);
            if (sqlData.err) {
                return { err: true, message: sqlData.result } as IData;
            }
            return { err: false, data: sqlData.result[0] } as IData;
        } catch (error) {
            return { err: true, message: "Database error: " + error.message } as IData;
        }
    };

    
    public static getMedicalHistoryById = async (hid: number) => {
        const sqlQuery = `CALL sp_getMedicalHistoryById(${hid})`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };
    

   
    public static deleteMedicalHistory = async (hid: number) => {
        const sqlQuery = `CALL sp_deleteMedicalHistory(${hid})`;
        const sqlData = await Mysql.connect(sqlQuery,null );
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
    };
    
    public static getAllMedicalHistory = async () => {
        const sqlQuery = `CALL sp_getAllMedicalHistory()`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };
}
