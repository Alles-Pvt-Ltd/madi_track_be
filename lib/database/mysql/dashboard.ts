import Mysql from "./connection";
import { IData } from "../../core/common/constant";
import { IFamily } from "core/interface/common";

export class Dashboard {
  
    public static getDashboardData = async (divisionId: number) => {
      const sqlQueryString = `CALL sp_dashboardForMobile(${divisionId})`;
      const sqlData = await Mysql.connect(sqlQueryString, null);

      if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
      return { err: false, data: sqlData.result } as IData;
  }
}