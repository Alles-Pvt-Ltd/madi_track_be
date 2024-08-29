"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    // get code,email,password by using email
    // *
    static getUserByEmail(email) {
        return `select users.image,users.name,users.code,users.email,users.password,users.is_enabled,user_role.role_id from users inner join user_role on users.id=user_role.user_id where email ='${email}'`;
    }
    // get code,email,password by using phone
    // *
    static getUserByPhone(mobile) {
        return `select users.image,users.name,users.code,users.email,users.password,users.is_enabled,user_role.role_id from users inner join user_role on users.id=user_role.user_id where mobile ='${mobile}' and users.is_enabled=1 and users.is_deleted=0`;
    }
    // user insert query
    // *
    // public static addUser(user_params: any) {
    static addUser(code, password, first_name, last_name, email, mobile, created_by, updated_by) {
        return `INSERT INTO users (code,password,first_name,last_name,email,mobile,created_by,updated_by) VALUES ('${code}','${password}','${first_name}', '${last_name}','${email}','${mobile}','${created_by}','${updated_by}')`;
    }
    // role insert query from user insert
    // *
    static addRole(user_id, user_role, created_by, updated_by) {
        return `INSERT INTO user_role (user_id, role_id,created_by,updated_by) VALUES ('${user_id}','${user_role}','${created_by}','${updated_by}')`;
    }
    //get all user
    // *
    static getAllUser() {
        return `select users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.code as role_code,roles.name as role_name
    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id)`;
    }
    //get user by code
    // *
    static getUserByCode(code) {
        console.log(code);
        return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile 
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where users.code='${code}' and users.is_deleted=0`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where users.code='${code}' and users.is_enabled=1 and users.is_deleted=0`;
    }
    //get user by code
    // *
    static getUser(code) {
        return `select * from users where code='${code}'`;
    }
    // find creater role by using user code
    // *
    static findCreatorRole(user_code) {
        return `select user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='${user_code}'`;
    }
    //update user by code
    // *
    // public static updateUser(data: any, user_params: any) {
    static updateUser(user_code, old_first_name, old_last_name, old_email, old_mobile, new_is_enabled, new_first_name, new_last_name, new_email, new_mobile, new_is_deleted, new_updated_by) {
        // public static updateUser(data: any, user_params: any) {
        return `UPDATE users
      SET code = '${user_code}',
      is_enabled='${new_is_enabled}',
      first_name='${new_first_name
            ? new_first_name
            : old_first_name}',
      last_name='${new_last_name
            ? new_last_name
            : old_last_name}',
      email='${new_email ? new_email : old_email}',
      mobile='${new_mobile ? new_mobile : old_mobile}',
      is_deleted='${new_is_deleted}',
      updated_by='${new_updated_by}'
      WHERE code = '${user_code}'`;
    }
    //get user by name
    // *
    static getUserByName(userName) {
        return `select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name
        from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.name like '%${userName}%'`;
    }
    //get user by mobile
    // *
    static getUserByMobileNo(mobile) {
        return `select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name
    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.mobile=${mobile}`;
    }
    //get user role by user id
    // *
    static getUserRoleByUserId(id) {
        return `select * from user_role where user_id=${id}`;
    }
    //delete user by id
    // *
    static deleteUser(id) {
        return `delete from users where id=${id}`;
    }
    // add distributor and amount
    // *
    static addDistributors(distributors_id) {
        return `INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('${distributors_id}',null,'0')`;
    }
    // add merchants and amount
    // *
    static addMerchants(distributors_id, merchant_id) {
        return `INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('${distributors_id}','${merchant_id}','0')`;
    }
    // get merchant bydistibutor
    // *
    static getMerchantByDistubuterId(id, page_number) {
        return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled 
      from 
      ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0 limit 10 offset ${10 * page_number}`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_enabled=1 and users.is_deleted=0`
    }
    // get all merchant bydistibutor
    // *
    static getAllMerchantByDistubuterId(id) {
        return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled 
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_enabled=1 and users.is_deleted=0`
    }
    // get merchant by distibutor id count
    // *
    static getMerchantByDistubuterIdCount(id) {
        return `select count(*) as merchants_count
    from users inner join merchants_distributors on users.id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_enabled=1 and users.is_deleted=0`
    }
    // // get merchant bydistibutor
    // public static getMerchantByMerchantId(code: any) {
    //   return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile 
    //   from 
    //   ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where users.code=${code}`
    // }
    // get all distibutor
    // *
    static getDistubuter(page_number) {
        return `select users.id as user_id,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled,merchants_distributors.amount,roles.code as role_code,roles.name as role_name
      from 
      ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_deleted=0 limit 10 offset ${10 * page_number}`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_enabled=1 and users.is_deleted=0` 
    }
    // get all distibutor
    // *
    static getAllDistubuter() {
        return `select users.id as user_id,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled,merchants_distributors.amount,roles.code as role_code,roles.name as role_name
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_deleted=0`;
        // ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_enabled=1 and users.is_deleted=0` limit 10 offset ${10*page_number}
    }
    // get all distibutor count
    // *
    static getAllDistubuterCount() {
        return `select count(*) as users_count from 
      users inner join merchants_distributors on users.id=merchants_distributors.distributors_id where merchants_distributors.merchants_id is null and users.is_deleted=0`;
    }
    // *
    // get user by user if
    static getUserByUserId(id) {
        return `select * from users where id='${id}'`;
    }
    // find creater role by using user code
    static getCreator(user_code) {
        return `select users.id,users.name,users.image,user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='${user_code}'`;
    }
}
exports.Query = Query;
