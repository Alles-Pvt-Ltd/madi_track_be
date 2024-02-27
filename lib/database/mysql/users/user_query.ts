import { Request, Response } from "express";

export class Query {
  // get code,email,password by using email
  // *
  public static getUserByEmail(email: any) {
    return `select users.image,users.name,users.code,users.email,users.password,users.is_enabled,user_role.role_id from users inner join user_role on users.id=user_role.user_id where email ='${email}'`;
  }

  // get code,email,password by using phone
  // *
  public static getUserByPhone(mobile: any) {
    return `select users.image,users.name,users.code,users.email,users.password,users.is_enabled,user_role.role_id from users inner join user_role on users.id=user_role.user_id where mobile ='${mobile}' and users.is_enabled=1 and users.is_deleted=0`;
  }

  // user insert query
  // *
  // public static addUser(user_params: any) {
    public static addUser(code:any,password:any,first_name:any, last_name:any,email:any,mobile:any,created_by:any,updated_by:any) {

    return `INSERT INTO users (code,password,first_name,last_name,email,mobile,created_by,updated_by) VALUES ('${code}','${password}','${first_name}', '${last_name}','${email}','${mobile}','${created_by}','${updated_by}')`;
  }

  // role insert query from user insert
  // *
  public static addRole(user_id:any,user_role:any,created_by:any,updated_by:any) {
    return `INSERT INTO user_role (user_id, role_id,created_by,updated_by) VALUES ('${user_id}','${user_role}','${created_by}','${updated_by}')`;
  }

  //get all user
  // *
  public static getAllUser() {
    return `select users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.code as role_code,roles.name as role_name
    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id)`;
  }

  //get user by code
  // *
  public static getUserByCode(code: any) {
    console.log(code);
    
    return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile 
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where users.code='${code}' and users.is_deleted=0`;
    // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where users.code='${code}' and users.is_enabled=1 and users.is_deleted=0`;
 }

  //get user by code
  // *
  public static getUser(code: any) {
    return `select * from users where code='${code}'`;
  }

  // find creater role by using user code
  // *
  public static findCreatorRole(user_code: any) {
    return `select user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='${user_code}'`;
  }


  //update user by code
  // *
  // public static updateUser(data: any, user_params: any) {
    public static updateUser(user_code:any,old_first_name:any,old_last_name:any,old_email:any,old_mobile:any,new_is_enabled:any,new_first_name:any,new_last_name:any,new_email:any,new_mobile:any,new_is_deleted:any,new_updated_by:any) {
      // public static updateUser(data: any, user_params: any) {
    return `UPDATE users
      SET code = '${user_code}',
      is_enabled='${new_is_enabled}',
      first_name='${
        new_first_name
          ? new_first_name
          : old_first_name
      }',
      last_name='${
        new_last_name
          ? new_last_name
          : old_last_name
      }',
      email='${
        new_email ? new_email : old_email
      }',
      mobile='${
        new_mobile ? new_mobile : old_mobile
      }',
      is_deleted='${new_is_deleted}',
      updated_by='${new_updated_by}'
      WHERE code = '${user_code}'`;
  }

  //get user by name
  // *
  public static getUserByName(userName: any) {
    return `select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name
        from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.name like '%${userName}%'`;
  }

  //get user by mobile
  // *
  public static getUserByMobileNo(mobile: any) {
    return `select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name
    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.mobile=${mobile}`;
  }

  //get user role by user id
  // *
  public static getUserRoleByUserId(id: any) {
    return `select * from user_role where user_id=${id}`;
  }



  //delete user by id
  // *
  public static deleteUser(id: any) {
    return `delete from users where id=${id}`;
  }

  // add distributor and amount
  // *
  public static addDistributors(distributors_id: any) {
    return `INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('${distributors_id}',null,'0')`;
  }

  // add merchants and amount
  // *
  public static addMerchants(distributors_id:any,merchant_id: any) {
    return `INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('${distributors_id}','${merchant_id}','0')`;
  }

    // get merchant bydistibutor
  // *
    public static getMerchantByDistubuterId(id: any,page_number:any) {
      return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled 
      from 
      ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0 limit 10 offset ${10*page_number}`
      // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_enabled=1 and users.is_deleted=0`
    }

      // get all merchant bydistibutor
  // *
  public static getAllMerchantByDistubuterId(id: any) {
    return `select merchants_distributors.amount,roles.code as role_code,roles.name as role_name,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled 
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0`
    // ((users inner join merchants_distributors on users.id=merchants_distributors.merchants_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_enabled=1 and users.is_deleted=0`
  }

  // get merchant by distibutor id count
  // *
  public static getMerchantByDistubuterIdCount(id: any) {
    return `select count(*) as merchants_count
    from users inner join merchants_distributors on users.id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${id} and merchants_distributors.merchants_id is not null and users.is_deleted=0`
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
     public static getDistubuter(page_number:any) {
      return `select users.id as user_id,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled,merchants_distributors.amount,roles.code as role_code,roles.name as role_name
      from 
      ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_deleted=0 limit 10 offset ${10*page_number}`
      // ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_enabled=1 and users.is_deleted=0` 
    }

       // get all distibutor
  // *
  public static getAllDistubuter() {
    return `select users.id as user_id,users.code as user_code,users.image as image,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,users.is_enabled,merchants_distributors.amount,roles.code as role_code,roles.name as role_name
    from 
    ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_deleted=0`
    // ((users inner join merchants_distributors on users.id=merchants_distributors.distributors_id) inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id where merchants_distributors.merchants_id is null and users.is_enabled=1 and users.is_deleted=0` limit 10 offset ${10*page_number}
  }

    // get all distibutor count
  // *
    public static getAllDistubuterCount() {
      return `select count(*) as users_count from 
      users inner join merchants_distributors on users.id=merchants_distributors.distributors_id where merchants_distributors.merchants_id is null and users.is_deleted=0`
    }

  // *
// get user by user if
    public static getUserByUserId(id: any) {
      return `select * from users where id='${id}'`;
    }


    // find creater role by using user code
   public static getCreator(user_code: any) {
    return `select users.id,users.name,users.image,user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='${user_code}'`;
  }

    //update user role by user id
    // public static updateUserRoleByUserId(user_params: any, data: any) {
    
    //   return `UPDATE user_role
    //   SET role_id = '${
    //     user_params.req.body.role_id ? user_params.req.body.role_id : data.role_id
    //   }',
    //   is_deleted='${user_params.req.body.is_role_deleted}',
    //   updated_by='${user_params.updated_by}'
    //   WHERE user_id = ${data.user_id}`;
    // }

}
