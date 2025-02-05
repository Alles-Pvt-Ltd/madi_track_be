import { IData } from "../../core/common/constant";
import Mysql from "./connection";

export class App {
  public static addIntro = async (title: string, description: string, img_url: string) => {
    const sqlQueryString = `CALL sp_addIntro('${title}', '${description}', '${img_url}')`;
    const result = await Mysql.connect(sqlQueryString, null);
    if (result.err) {
        return { err: true, message: result.result };
    }
    return { err: false, data: result.result[0] };
};

    public static getIntroById = async (sid: number) => {
        const sqlQuery = `CALL sp_getById('${sid}')`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };

    public static updateIntro = async (sid: number,title: string,description: string, img_url: string,updatedBy: number ) => {
      const sqlQueryString = `CALL sp_updateIntro(${sid}, '${title}', '${description}', '${img_url}', ${updatedBy})`;
      
      const sqlData = await Mysql.connect(sqlQueryString, null);
  
      if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
      }
      return { err: false, data: sqlData.result[0] } as IData; 
  };
  
  
    public static deleteIntro = async (sid: number) => {
        const sqlQuery = `CALL sp_deleteIntro(${sid})`;
        const sqlData = await Mysql.connect(sqlQuery,null );
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };

    public static getAllIntro = async () => {
        const sqlQuery = `CALL sp_getAllIntro()`;
    
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };
    
}


