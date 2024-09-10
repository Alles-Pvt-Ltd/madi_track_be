import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily, IHistory, IMember } from "core/interface/common";

export class Family {

    public static getDuplicateFamily = async (nicNo: string,cardNumber: number) => {
        const sqlQueryString = `CALL sp_getFamilyByNicNo ('${nicNo}',${cardNumber})`;

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

    public static getDuplicateMember = async (firstName: string, lastName: string, familyId: number) => {
      const sqlQueryString = `CALL sp_getDuplicateMember ('${firstName}','${lastName}',${familyId})`;

      const sqlData = await Mysql.connect(sqlQueryString, null);
      if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
      return { err: false, data: sqlData.result[0] } as IData;
    }

    public static addMember = async (memberData: IMember) => {
      const mobile = memberData.mobile !== null ? `'${memberData.mobile}'` : "NULL";
      const email = memberData.email !== null ? `'${memberData.email}'` : "NULL";
      const nicNo = memberData.nicNo !== null ? `'${memberData.nicNo}'` : "NULL";

      const sqlQueryString = `CALL sp_addMember ('${memberData.firstName}', '${memberData.lastName}', ${mobile}, ${email},
      ${memberData.gender}, ${memberData.role}, '${memberData.dateOfBirth}', ${nicNo}, ${memberData.occupation}, '${memberData.isGovernmentEmployee}',
      ${memberData.familyId})`;

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
      const mobile = memberData.mobile !== null ? `'${memberData.mobile}'` : "NULL";
      const email = memberData.email !== null ? `'${memberData.email}'` : "NULL";
      const nicNo = memberData.nicNo !== null ? `'${memberData.nicNo}'` : "NULL";

      const sqlQueryString = `CALL sp_updateMember ('${memberData.id}', '${memberData.firstName}', '${memberData.lastName}', ${mobile}, ${email},
      '${memberData.gender}', '${memberData.role}', '${memberData.dateOfBirth}', ${nicNo}, '${memberData.occupation}', '${memberData.isGovernmentEmployee}')`;

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
          return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData;
  }

  public static addHistory = async (historyData: IHistory, createdBy: number) => {
    const sqlQueryString = `CALL sp_addHistory ('${historyData.date}', '${historyData.description}', '${historyData.organization}',
    '${historyData.familyId}', NOW(), ${createdBy})`;

    const sqlData = await Mysql.connect(sqlQueryString, null);

    if (sqlData.err) {
        return { err: true, message: sqlData.result } as IData;
      }
    return { err: false, data: sqlData.result } as IData;
  }

  public static updateFamily = async (familyData: IFamily) => {
    const sqlQueryString = `CALL sp_updateFamily ('${familyData.id}', '${familyData.cardNumber}', '${familyData.familyName}', '${familyData.address}',
    '${familyData.phone}', '${familyData.nicNo}')`;

    try {
      const sqlData = await Mysql.connect(sqlQueryString, null);
      if(sqlData.err)
      {
        throw new Error("Database Error");
      }
      return { err: false, data: sqlData.result}
    }
    catch (error) {
      return { err: true, message: "Server Error Please contact admin"}
    }
  }

  public static updateHistory = async (historyData: IHistory, updatedBy: number) => {
    const sqlQueryString = `CALL sp_updateHistory (${historyData.id},'${historyData.date}', '${historyData.description}', '${historyData.organization}',
    NOW(), ${updatedBy})`;

    const sqlData = await Mysql.connect(sqlQueryString, null);

    if (sqlData.err) {
        return { err: true, message: "Cannot update, please try after sometime" } as IData;
      }
    return { err: false, data: sqlData.result } as IData;
  }

  public static deleteHistory = async (id: number, userId: number) => {
    const sqlQueryString = `CALL sp_deleteHistory (${id}, ${userId}, NOW())`;
    const sqlData = await Mysql.connect(sqlQueryString, null);

    if (sqlData.err) {
      return { err: true, message: "Error while delete, try after some time" } as IData;
    }
    return { err: false, data: sqlData.result} as IData;
  }

  public static getMemberById = async (id: number) => {
    const sqlQueryString = `CALL sp_getMemberById (${id})`;

      const sqlData = await Mysql.connect(sqlQueryString, null);

      if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result } as IData; 
  }
}