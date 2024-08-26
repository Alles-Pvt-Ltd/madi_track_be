import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily, IMember } from "core/interface/common";

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

    public static addMember = async (memberData: IMember) => {
      const sqlQueryString = `CALL sp_addMember ('${memberData.firstName}', '${memberData.lastName}', '${memberData.mobile}', '${memberData.email}',
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', '${memberData.nicNo}', '${memberData.occupation}', '${memberData.isGovernmentEmployee}',
      '${memberData.familyId}')`;

      try {
        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
          throw new Error("Database Error");
        }
        return { err: false, data: sqlData.result}
      }
      catch (error) {
        return { err: true, message: error.message}
      }
    }

    public static updateMemmber = async (memberData: IMember) => {
      const sqlQueryString = `CALL sp_updateMember ('${memberData.id}', '${memberData.firstName}', '${memberData.lastName}', '${memberData.mobile}', '${memberData.email}',
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', '${memberData.nicNo}', '${memberData.occupation}', '${memberData.isGovernmentEmployee}')`;

      try {
        const sqlData = await Mysql.connect(sqlQueryString, null);
        if(sqlData.err)
        {
          throw new Error("Database Error");
        }
        return { err: false, data: sqlData.result}
      }
      catch (error) {
        return { err: true, message: error.message}
      }
    }
}