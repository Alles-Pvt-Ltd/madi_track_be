"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../core/common/logger");
var mysql = require("mysql");
const db_config = {
    host: "157.230.247.143",
    port: 3306,
    user: "gs-app",
    password: "Alles_gs1717",
    database: "medi_track_db",
    insecureAuth: true
};
const pool = mysql.createPool(db_config);
class Mysql {
}
exports.default = Mysql;
Mysql.connect = (query, data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connect) => {
            if (err) {
                logger_1.Logger.errorLogger({ place: 'Database Connection', err });
                return resolve({ err: true, result: err, data });
            }
            connect.query(query, (err, result) => {
                connect.release();
                if (err) {
                    logger_1.Logger.errorLogger({ place: 'Database Connection SQL Error', err });
                    return resolve({ err: true, result: err, data });
                }
                else {
                    return resolve({ err: false, result, data });
                }
            });
        });
    });
};
