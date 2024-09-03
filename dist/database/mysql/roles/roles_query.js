"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesQuery = void 0;
class RolesQuery {
    //get roles
    // *
    static getRoles(page_number) {
        return `select code as role_code,name as role_name from roles where is_deleted=0 limit 10 offset ${10 * page_number}`;
    }
    //get all roles
    // *
    static getAllRoles() {
        return `select code as role_code,name as role_name from roles where is_deleted=0`;
    }
    //get all roles
    // *
    static getAllRolesCount() {
        return `select count(*) as roles_count from roles where is_deleted=0`;
    }
    // add roles
    static addRole(code, name, created_by, updated_by) {
        return `INSERT INTO roles (code,name,created_by,updated_by) VALUES ('${code}','${name}','${created_by}','${updated_by}')`;
    }
    // update roles
    // public static updateUser(data: any, user_params: any) {
    static updateRole(code, old_name, new_name, new_is_deleted, new_updated_by) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE roles
      SET code = '${code}',
      name='${new_name ? new_name : old_name}',
      is_deleted='${new_is_deleted}',
      updated_by='${new_updated_by}'
      WHERE code = '${code}'`;
    }
    // get role details by code
    static getRoleByCode(code) {
        return `select code as role_code,name as role_name,is_deleted from roles where code='${code}'`;
    }
}
exports.RolesQuery = RolesQuery;
