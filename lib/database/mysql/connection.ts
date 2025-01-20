
import { connect } from "http2";
import { Logger } from "../../core/common/logger";
import { connection } from "mongoose";

var mysql = require("mysql");

const db_config = {
  host: "127.0.0.1",
  port: 3306,
  user: "project",
  password: "2002@KM*n20",
  database: "medi_track_db",
  insecureAuth: true
};

const pool = mysql.createPool(db_config);

interface MySQLResponse {
  err: boolean;
  result: any;
  data: any;
}

export default class Mysql {
  public static connect = (query: string, data: any) => {
    return new Promise<MySQLResponse>((resolve, reject) => {
      pool.getConnection((err, connection) => { // Get connection from pool
        if (err) {
          Logger.errorLogger({ place: 'Database Connection', err });
          return resolve({ err: true, result: err, data });
        }

        // Correct usage of the connection object
        connection.query(query, data, (err, result) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            Logger.errorLogger({ place: 'Database Connection SQL Error', err });
            return resolve({ err: true, result: err, data });
          } else {
            return resolve({ err: false, result, data });
          }
        });
      });
    });
  }

  
}
