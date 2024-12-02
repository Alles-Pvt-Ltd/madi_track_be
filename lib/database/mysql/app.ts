import { IData } from "../../core/common/constant";
import Mysql from "./connection";

export class App {
    public static addIntro = async (title: string, description: string, img_url: string) => {
        const sqlQueryString = `CALL sp_AppIntro(0, '${title}', '${description}', '${img_url}')`;
        const sqlData = await Mysql.connect(sqlQueryString, null);
        
        if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
      };

    public static getIntroById = async (sid: number) => {
        const sqlQuery = `CALL sp_getById('${sid}')`;
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result[0] } as IData;
    };

    public static updateIntro = async (sid: number, title: string, description: string, img_url: string) => {
        const sqlQueryString = `CALL sp_AppIntro(${sid}, '${title}', '${description}', '${img_url}')`;  
        const sqlData = await Mysql.connect(sqlQueryString, null);
    
        if (sqlData.err) {
          return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
      };

    public static deleteIntro = async (sid: number) => {
        const sqlQuery = `CALL sp_deleteIntro(${sid})`;
        const sqlData = await Mysql.connect(sqlQuery,null );
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
    };

    public static getAllIntro = async () => {
        const sqlQuery = `CALL sp_getAllIntro()`;
    
        const sqlData = await Mysql.connect(sqlQuery, null);
    
        if (sqlData.err) {
            return { err: true, message: sqlData.result } as IData;
        }
        return { err: false, data: sqlData.result } as IData;
    };
    
}
