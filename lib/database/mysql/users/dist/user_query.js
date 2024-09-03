"use strict";
exports.__esModule = true;
exports.Query = void 0;
var Query = /** @class */ (function () {
    function Query() {
    }
    // get code,email,password by using email
    Query.loginQuery = function (req) {
        return "select users.image,users.name,users.code,users.email,users.password,users.is_enabled,user_role.role_id from users inner join user_role on users.id=user_role.user_id where email ='" + req.body.email + "'";
    };
    // user insert query
    Query.addUser = function (user_params) {
        return "INSERT INTO users (code, name, password,first_name,last_name,email,mobile,created_by,updated_by) VALUES ('" + user_params.code + "','" + user_params.req.body.name + "','" + user_params.req.body.password + "','" + user_params.req.body.first_name + "', '" + user_params.req.body.last_name + "','" + user_params.req.body.email + "','" + user_params.req.body.mobile + "','" + user_params.created_by + "','" + user_params.updated_by + "')";
    };
    // role insert query from user insert
    Query.addRole = function (user_params) {
        return "INSERT INTO user_role (user_id, role_id,created_by,updated_by) VALUES ('" + user_params.req.createdUser.insertId + "','" + user_params.req.userRole + "','" + user_params.created_by + "','" + user_params.updated_by + "')";
    };
    //get all user
    Query.getAllUser = function () {
        return "select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name\n    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id)";
    };
    //get user by code
    Query.getUserByCode = function (code) {
        return "select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name\n        from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.code='" + code + "'";
    };
    //get user by name
    Query.getUserByName = function (userName) {
        return "select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name\n        from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.name like '%" + userName + "%'";
    };
    //get user by mobile
    Query.getUserByMobileNo = function (mobile) {
        return "select users.code as user_code,users.name as user_name,users.first_name as first_name,users.last_name as last_name,users.email as email,users.mobile as mobile,roles.name as role_name\n    from ((users inner join user_role on users.id=user_role.user_id) inner join roles on roles.id=user_role.role_id) where users.mobile=" + mobile;
    };
    //get user by code
    Query.getUser = function (code) {
        return "select * from users where code='" + code + "'";
    };
    //update user by code
    Query.updateUser = function (data, user_params) {
        return "UPDATE users\n    SET code = '" + data.code + "',\n    name='" + (user_params.req.body.name ? user_params.req.body.name : data.name) + "',\n    is_enabled='" + user_params.req.body.is_enabled + "',\n    first_name='" + (user_params.req.body.first_name
            ? user_params.req.body.first_name
            : data.first_name) + "',\n    last_name='" + (user_params.req.body.last_name
            ? user_params.req.body.last_name
            : data.last_name) + "',\n    email='" + (user_params.req.body.email ? user_params.req.body.email : data.email) + "',\n    mobile='" + (user_params.req.body.mobile ? user_params.req.body.mobile : data.mobile) + "',\n    is_deleted='" + user_params.req.body.is_deleted + "',\n    updated_by='" + user_params.updated_by + "'\n    WHERE code = '" + user_params.req.params.code + "'";
    };
    //get user role by user id
    Query.getUserRoleByUserId = function (id) {
        return "select * from user_role where user_id=" + id;
    };
    //get user role by user id
    Query.updateUserRoleByUserId = function (user_params, data) {
        return "UPDATE user_role\n    SET role_id = '" + (user_params.req.body.role_id ? user_params.req.body.role_id : data.role_id) + "',\n    is_deleted='" + user_params.req.body.is_role_deleted + "',\n    updated_by='" + user_params.updated_by + "'\n    WHERE user_id = " + data.user_id;
    };
    //get user by id
    Query.deleteUser = function (id) {
        return "delete from users where id=" + id;
    };
    // find creater role by using user code
    Query.findCreatorRole = function (user_params) {
        return "select user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='" + user_params.req.user.id + "'";
    };
    // find creater role by using user code
    Query.getCreator = function (req) {
        return "select users.id,user_role.role_id from user_role inner join users on user_role.user_id=users.id where users.code='" + req.user.id + "'";
    };
    // add distributor and amount
    Query.addDistributors = function (user_params) {
        return "INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('" + user_params.req.createdUser.insertId + "',null,'0')";
    };
    // add merchants and amount
    Query.addMerchants = function (user_params) {
        return "INSERT INTO merchants_distributors (distributors_id, merchants_id, amount) VALUES ('" + user_params.req.creatorId + "','" + user_params.req.createdUser.insertId + "','0')";
    };
    return Query;
}());
exports.Query = Query;
