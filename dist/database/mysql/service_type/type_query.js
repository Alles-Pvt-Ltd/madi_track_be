"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeQuery = void 0;
class TypeQuery {
    //get type
    // *
    static getType(page_number) {
        return `select type.code,type.type_code,type.name as type_name,type.is_enabled,services.code as service_code,services.name as service_name,services.is_enabled as service_is_enable from (type inner join map_service_type on type.id = map_service_type.type_id) inner join services on services.id = map_service_type.service_id where type.is_deleted=0 limit 10 offset ${10 * page_number}`;
    }
    ;
    //get all type
    // *
    static getAllType() {
        return `select type.code,type.type_code,type.name as type_name,type.is_enabled,services.code as service_code,services.name as service_name,services.is_enabled as service_is_enable from (type inner join map_service_type on type.id = map_service_type.type_id) inner join services on services.id = map_service_type.service_id where type.is_deleted=0`;
    }
    ;
    //get all type
    // *
    static getAllTypeCount() {
        return `select count(*) as types_count from type where type.is_deleted=0`;
    }
    ;
    // add roles
    static addType(code, name, created_by, updated_by) {
        return `INSERT INTO type (code,name,created_by,updated_by) VALUES ('${code}','${name}','${created_by}','${updated_by}')`;
    }
    // update roles
    // public static updateUser(data: any, user_params: any) {
    static updateType(code, old_name, new_name, is_deleted, is_enabled, updated_by) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE type
        SET code = '${code}',
        name='${new_name ? new_name : old_name}',
        is_deleted='${is_deleted}',
        is_enabled='${is_enabled}',
        updated_by='${updated_by}'
        WHERE code = '${code}'`;
    }
    // get role details by code
    static getTypeByCode(code) {
        return `select code,name as type_name,type_code as type_code,is_deleted,is_enabled from type where code='${code}'`;
    }
    // get role details by code
    static getAllDetailsOfTypeByCode(code) {
        return `select * from type where code='${code}'`;
    }
    // add map_service_type
    static addMapServiceType(type_id, service_id) {
        return `INSERT INTO map_service_type (type_id,service_id) VALUES ('${type_id}','${service_id}')`;
    }
    // update map service type
    // public static updateUser(data: any, user_params: any) {
    static updateMapServiceType(type_id, service_id) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE map_service_type
        SET type_id = ${type_id},
        service_id=${service_id}
        WHERE type_id = ${type_id}`;
    }
}
exports.TypeQuery = TypeQuery;
