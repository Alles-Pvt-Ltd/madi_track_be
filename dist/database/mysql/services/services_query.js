"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceQuery = void 0;
class ServiceQuery {
    //get services
    // *
    static getServices(page_number) {
        return `select code,service_code,name as service_name,image,is_enabled from services where is_deleted=0 limit 10 offset ${10 * page_number}`;
    }
    ;
    //get all services
    static getAllServices() {
        return `select code,service_code,name as service_name,image,is_enabled from services where is_deleted=0`;
    }
    ;
    //get all services
    static getAllServicesCount() {
        return `select count(*) as services_count from services where is_deleted=0`;
    }
    ;
    //add services
    // public  static addServices(req:any) {
    //   var path=req.file.path;
    //   path=path.replace(/\\/g,'/');
    //   // path="localhost:3000/reload_node/"+path;
    //   // path="http://64.227.191.156:3000/reload_node/"+path;
    //   // console.log("hi"+path);
    //   return `UPDATE services
    //   SET image = '${path}'
    //   WHERE code = '${req.params.code}'`;
    // };
    //  //get service image
    //  public static getServiceImage(req:any) {
    //   return `select code,name,image from services`;
    // };
    // add roles
    static addService(code, name, created_by, updated_by) {
        return `INSERT INTO services (code,name,created_by,updated_by) VALUES ('${code}','${name}','${created_by}','${updated_by}')`;
    }
    // update roles
    // public static updateUser(data: any, user_params: any) {
    static updateService(code, old_name, new_name, is_deleted, is_enabled, updated_by) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE services
        SET code = '${code}',
        name='${new_name ? new_name : old_name}',
        is_deleted='${is_deleted}',
        is_enabled='${is_enabled}',
        updated_by='${updated_by}'
        WHERE code = '${code}'`;
    }
    // get role details by code
    static getServiceByCode(code) {
        return `select code,name as service_name,service_code as service_code,is_deleted,is_enabled from services where code='${code}'`;
    }
    // get role details by code
    static getAllDetailsOfServiceByCode(code) {
        return `select * from services where code='${code}'`;
    }
}
exports.ServiceQuery = ServiceQuery;
