"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ez_lankaQuery = void 0;
class Ez_lankaQuery {
    //get all ez_lanka provider
    // *
    static getEz_lankaProviders(page_number) {
        return `select code as ezlanka_provider_code,name as ezlanka_provider_name,op_code from ez_lanka_provider where is_deleted=0 limit 10 offset ${10 * page_number}`;
    }
    //get all ez_lanka provider
    // *
    static getAllEz_lankaProviders() {
        return `select code as ezlanka_provider_code,name as ezlanka_provider_name,op_code from ez_lanka_provider where is_deleted=0`;
    }
    //get all ez_lanka provider
    // *
    static getAllEz_lankaProvidersCount() {
        return `select count(*) as ezlankaCount from ez_lanka_provider where is_deleted=0`;
    }
    // add ez_lanka provider
    static addEz_lankProvider(code, name, op_code, created_by, updated_by) {
        return `INSERT INTO ez_lanka_provider (code,name,op_code,created_by,updated_by) VALUES ('${code}','${name}','${op_code}','${created_by}','${updated_by}')`;
    }
    // update ez_lanka provider
    // public static updateUser(data: any, user_params: any) {
    static updateEz_lankProvider(code, old_name, new_name, old_op_code, new_op_code, new_is_deleted, new_updated_by) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE ez_lanka_provider
      SET code = '${code}',
      name='${new_name ? new_name : old_name}',
      op_code='${new_op_code ? new_op_code : old_op_code}',
      is_deleted='${new_is_deleted}',
      updated_by='${new_updated_by}'
      WHERE code = '${code}'`;
    }
    // get ez_lanka provider details by code
    static getEz_lankaProviderByCode(code) {
        return `select id,code as ez_lanka_code,name as provider_name,op_code as op_code,is_deleted from ez_lanka_provider where code='${code}'`;
    }
}
exports.Ez_lankaQuery = Ez_lankaQuery;
