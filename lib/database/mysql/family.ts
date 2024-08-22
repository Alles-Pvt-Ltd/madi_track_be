import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily } from "core/interface/common";

export class Family {
    public static addFamily = async (familyData: IFamily) => {
        const sqlQueryString = `CALL sp_addFamily ('${familyData.cardNumber}', '${familyData.familyName}', '${familyData.address}',
        '${familyData.phone}', '${familyData.nicNo}', ${familyData.gsDivisionId})`;

        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result } as IData;
    }

    public static getAllFamiliesDetails = async (divisionId: number) => {
        const sqlQueryString = `CALL sp_getAllFamiliesOfGsDivision (${divisionId})`;

        const sqlData = await Mysql.connect(sqlQueryString, null);
        
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result } as IData;
    }
}