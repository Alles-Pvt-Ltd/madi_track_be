import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily, IMember } from "core/interface/common";

export class Family {

    public static getDuplicateFamily = async (nicNo: string) => {
        const sqlQueryString = `CALL sp_getFamilyByNicNo ('${nicNo}')`;

        const sqlData = await Mysql.connect(sqlQueryString, null);

        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
          }
        return { err: false, data: sqlData.result[0] } as IData;
    }

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

    public static getDuplicateMember = async (nicNo: string) => {
      const sqlQueryString = `CALL sp_getMemberByNicNo ('${nicNo}')`;

      const sqlData = await Mysql.connect(sqlQueryString, null);

      if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
      return { err: false, data: sqlData.result[0] } as IData;
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

    public static getFamilyDetailsById = async (familyId: number) => {
      const sqlQueryString = `CALL sp_getFamilyById (${familyId})`;

      const sqlData = await Mysql.connect(sqlQueryString, null);

      if (sqlData.err) {
          console.log("Error executing getFamilyDetailsById query:", sqlData.result);
          return { err: true, message: sqlData.result } as IData;
      }
      console.log("getFamilyDetailsById query executed successfully:", sqlData.result);
      return { err: false, data: sqlData.result } as IData;
  }
}