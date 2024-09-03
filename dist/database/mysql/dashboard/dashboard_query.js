"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQuery = void 0;
class DashboardQuery {
    //get all services
    // *
    static getmerchantsForDistibuter(d_id) {
        return `select merchants_distributors.amount,users.code as user_code,users.name as user_name,users.email as email,users.mobile as mobile
    from users inner join merchants_distributors on users.id=merchants_distributors.merchants_id where distributors_id=${d_id} and merchants_id is not null`;
    }
}
exports.DashboardQuery = DashboardQuery;
