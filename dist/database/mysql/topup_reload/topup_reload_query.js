"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopUpReloadQuery = void 0;
class TopUpReloadQuery {
    // get merchans by user id
    static getMerchansByUserId(m_id) {
        return `select amount,distributors_id,updated_date from merchants_distributors where merchants_id=${m_id}`;
    }
    // get distributor by user id,here distributor will not have merchans so we check the merchans field as null
    static getDistributorsByUserId(d_id) {
        return `select amount,distributors_id,updated_date from merchants_distributors where distributors_id=${d_id} and merchants_id is null`;
    }
    // get admin wallet
    static getAdmin() {
        return `select amount from admin_wallet`;
    }
    // topup merchans
    static topupMechant(amount, merchants_id) {
        return `UPDATE merchants_distributors
        SET amount = '${amount}'
        WHERE merchants_id = '${merchants_id}'`;
    }
    // topup distributor
    static topupDistributor(amount, distributors_id) {
        return `UPDATE merchants_distributors
        SET amount = '${amount}'
        WHERE distributors_id = '${distributors_id}'  and merchants_id is null`;
    }
    // update admin blance
    static updateAmountToAdmin(amount) {
        return `UPDATE admin_wallet
        SET amount = '${amount}'
        WHERE admin_id = '119'`;
    }
    // add topup history
    static addTopUpHistory(amount, distributor_id, merchant_id) {
        return `INSERT INTO topup_history (distributor_id,merchant_id,amount) VALUES ('${distributor_id}','${merchant_id}','${amount}')`;
    }
    // add reload history
    static addDistributorTopUpHistory(admin, distributor_id, amount) {
        return `INSERT INTO admin_distributors_topup (admin_id,distributor_id,amount) VALUES ('${admin}','${distributor_id}','${amount}')`;
    }
    // get distributor by user id,here distributor will not have merchans so we check the merchans field as null
    static getProvidersPercentageByProviderCode(provider_code) {
        // return `select providers_percentage.merchants_percentage ,providers_percentage.distributor_percentage,providers_percentage.admin_percentage,services.id as service_id from services inner join providers_percentage on providers_percentage.service_id=services.id where services.code='${req.body.service_code}'`;
        return `select providers_percentage.provider_percentage,providers_percentage.admin_distibutor_percentage,providers_percentage.merchants_percentage ,providers_percentage.distributor_percentage,providers_percentage.admin_percentage,providers.id as provider_id from providers inner join providers_percentage on providers_percentage.provider_id=providers.id where providers.code='${provider_code}'`;
    }
    // get ezlanka provider
    static getProvider(providerCode) {
        // return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date
        // from ((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) where reload_history.mobile='${mobile}' LIMIT 100`;
        return `select ez_lanka_provider.op_code as opcode,map_type_provider.type_id as type_id
      from ((providers inner join map_reload_app_ez_lanka_provider on providers.id=map_reload_app_ez_lanka_provider.reload_app_providers_id) inner join ez_lanka_provider on map_reload_app_ez_lanka_provider.ez_lanka_providers_id=ez_lanka_provider.id) inner join map_type_provider on map_type_provider.provider_id=providers.id where  providers.code='${providerCode}'
    `;
    }
    // get Services Percentage By serviceId
    static getServicesPercentageByserviceId(provider_id) {
        // return `select providers_percentage.merchants_percentage ,providers_percentage.distributor_percentage,services.id as service_id from services inner join providers_percentage on providers_percentage.service_id=services.id where services.id='${serviceId}'`;
        return `select providers_percentage.merchants_percentage,providers_percentage.distributor_percentage,providers_percentage.admin_percentage,providers.id as provider_id from providers inner join providers_percentage on providers_percentage.provider_id=providers.id where providers.id='${provider_id}'`;
    }
    // get merchant topup history by merchant id
    static getMerchantHistory(id) {
        return `select amount,created_date from topup_history  where merchant_id=${id} LIMIT 100`;
    }
    // all reload history
    static allReloadHistory(page_number) {
        return `select users.code as merchants,users.name as merchant_name,reload_history.mobile,reload_history.amount,reload_history.created_date,merchants_distributors.distributors_id as distributors_id,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) limit 100 offset ${100 * page_number}`;
    }
    //  // all reload history
    //  public static allReloadHistory() {
    //   return `select users.code as merchants,users.name as merchant_name,reload_history.mobile,reload_history.amount,reload_history.created_date,merchants_distributors.distributors_id as distributors_id,u.name as distributors_name,u.code as distributors_code,reload_history.status
    //   from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id)`;
    // }
    // reload history count
    static reloadHistoryCount() {
        return `select count(*) as reload_history_count
    from reload_history`;
    }
    // reload history count by distibutor
    static distibutorReloadHistoryCount(dis_id) {
        return `select count(*) as reload_history_count
    from reload_history inner join merchants_distributors on reload_history.merchants_id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${dis_id}`;
    }
    // reload history count by distibutor
    static distibutorMerchantReloadHistoryCount(dis_id, mer_id) {
        return `select count(*) as reload_history_count
    from reload_history inner join merchants_distributors on reload_history.merchants_id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${dis_id} and merchants_distributors.merchants_id=${mer_id}`;
    }
    static mobileReloadHistoryCount(mobile) {
        return `select count(*) as reload_history_count
    from reload_history where mobile=${mobile}`;
    }
    static startDateReloadHistoryCount(s_date) {
        return `select count(*) as reload_history_count
    from reload_history where created_date like '${s_date}%'`;
    }
    static startAndEndDateReloadHistoryCount(s_date, e_date) {
        return `select count(*) as reload_history_count
    from reload_history where created_date between '${s_date}' and '${e_date}'`;
    }
    static distibutorStartDateReloadHistoryCount(dis_id, s_date) {
        return `select count(*) as reload_history_count
    from reload_history inner join merchants_distributors on reload_history.merchants_id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${dis_id} and reload_history.created_date like '${s_date}%'`;
    }
    static distibutorStartAndEndDateReloadHistoryCount(dis_id, s_date, e_date) {
        return `select count(*) as reload_history_count
    from reload_history inner join merchants_distributors on reload_history.merchants_id=merchants_distributors.merchants_id where merchants_distributors.distributors_id=${dis_id} and reload_history.created_date between '${s_date}' and '${e_date}'`;
    }
    // reload history by distributor
    static ReloadHistorybByDistributor(disId, page_number) {
        return `select users.code as merchants,users.name as merchant_name,reload_history.mobile,reload_history.amount,reload_history.created_date,merchants_distributors.distributors_id as distributors_id,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where merchants_distributors.distributors_id=${disId} limit 100 offset ${100 * page_number}`;
        //  `select mobile,amount,created_date from reload_history`;
    }
    // reload History By Distributor and Merchant
    static reloadHistoryByDistributorMerchant(disId, merId, page_number) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where merchants_distributors.distributors_id=${disId} and merchants_distributors.merchants_id=${merId} limit 100 offset ${100 * page_number}`;
    }
    // get Reload History By Mobile in admin side
    static getAdminReloadHistoryByMobile(mobile, page_number) {
        // return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date
        // from ((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) where reload_history.mobile='${mobile}' LIMIT 100`;
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.mobile='${mobile}' LIMIT 100 offset ${100 * page_number}`;
    }
    // get Reload History By Mobile in distibutor side
    static getDistibutorReloadHistoryByMobile(disId, mobile, page_number) {
        // return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date
        // from ((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) where reload_history.mobile='${mobile}' LIMIT 100`;
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.mobile='${mobile}' and merchants_distributors.distributors_id=${disId} LIMIT 100 offset ${100 * page_number}`;
    }
    // get reload history of reqid,merchantId
    static getReloadHistoryPendingStatus() {
        return `select reqid,status,merchants_id,service_id,provider_id,amount from reload_history where status='{"new":"PENDING"}'`;
    }
    // get reload history by reqid
    static getDistibutorReloadHistoryByReqid(disId, reqid) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.reqid='${reqid}' and merchants_distributors.distributors_id=${disId}
  `;
    }
    static getAdminReloadHistoryByReqid(reqid) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.reqid='${reqid}'
  `;
    }
    // get total amount of merchant and distibutor
    static getTotalAmountOfMerchantDistibutor() {
        return "select sum(merchants_distributors.amount) as total_amount from merchants_distributors";
    }
    // get total profit of admin amount
    static getTotalProfitOfAdmin() {
        return "select sum(admin_wallet.amount) as total_amount_of_admin from admin_wallet";
    }
    // get reload history by date
    static getAdminReloadHistoryBySdate(s_date, pageNumber) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
  from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.created_date like '${s_date}%' limit 100 offset ${100 * pageNumber}`;
    }
    // get reload history by date
    static getDistibutorReloadHistoryBySdate(dis_id, s_date, pageNumber) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
  from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.created_date like '${s_date}%' and merchants_distributors.distributors_id=${dis_id} limit 100 offset ${100 * pageNumber}`;
    }
    // get reload history by date
    static getAdminReloadHistoryBySdateAndEnddate(s_date, e_date, pageNumber) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
    from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where reload_history.created_date between '${s_date}' and '${e_date}' limit 100 offset ${100 * pageNumber}`;
    }
    // get reload history by date
    static getDistibutorReloadHistoryBySdateAndEnddate(dis_id, s_date, e_date, pageNumber) {
        return `select users.code as merchants,users.name as merchant_name,merchants_distributors.distributors_id as distributors_id,reload_history.mobile,reload_history.amount,reload_history.created_date,u.name as distributors_name,u.code as distributors_code,reload_history.status
  from (((merchants_distributors inner join reload_history on merchants_distributors.merchants_id=reload_history.merchants_id) inner join users on users.id=reload_history.merchants_id) inner join users u on u.id=merchants_distributors.distributors_id) where merchants_distributors.distributors_id=${dis_id} and  reload_history.created_date between '${s_date}' and '${e_date}' limit 100 offset ${100 * pageNumber}`;
    }
    // add reload history
    static addReloadHistory(merchant_id, req, ezLankaErrorCode, provider_id) {
        return `INSERT INTO reload_history (merchants_id,mobile,amount,status,reqid,service_id,provider_id) VALUES ('${merchant_id}','${req.body.mobile}','${req.body.amount}','${ezLankaErrorCode.reloadStatus}','${ezLankaErrorCode.reqid[0]}','1','${provider_id}')`;
    }
    // update user by code
    static updateReloadHistoryStatus(ezLankaErrorCode, status) {
        return `UPDATE reload_history
      SET status = '${status}'
      WHERE reqid = '${ezLankaErrorCode.reqid}'`;
    }
    // get merchant and distibutor by merchant code
    static getMerchantDistibutorByMerchantCode(code) {
        return `select merchants_distributors.distributors_id as distributors_id,merchants_distributors.merchants_id as merchants_id
      from (merchants_distributors inner join users on users.id=merchants_distributors.merchants_id) where users.code='${code}'
    `;
    }
    // all admin topup history
    static adminTopupHistory(page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
    from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id limit 100 offset ${100 * page_number}`;
    }
    // all admin topup history
    static adminTopupHistoryCount() {
        return `select count(*) as admin_topup_count
      from admin_distributors_topup`;
    }
    // all admin topup history by distibutor id
    static adminTopupHistoryCountByDistibutor(dis_id) {
        return `select count(*) as admin_topup_count
        from admin_distributors_topup where distributor_id=${dis_id}`;
    }
    // admin topup history by distributor
    static adminTopupHistorybByDistributorId(disId, page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
      from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where admin_distributors_topup.distributor_id=${disId} limit 100 offset ${100 * page_number}`;
    }
    // all distibutor topup history
    static distibutorTopupHistory(dis_id, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
    from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} limit 100 offset ${100 * page_number}`;
    }
    // all distibutor topup history count
    static distibutorTopupHistoryCount(dis_id) {
        return `select count(*) as distibutorTopupHistoryCount
      from topup_history where topup_history.distributor_id=${dis_id}`;
    }
    // get topup history by distributor
    static distibutorTopupHistoryByMerchantId(dis_id, merId, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
      from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and topup_history.merchant_id=${merId} limit 100 offset ${100 * page_number}`;
    }
    // get topup history by distributor
    static distibutorTopupHistoryByMerchantIdCount(dis_id, merId) {
        return `select count(*) as distibutorTopupHistoryCount
        from topup_history where topup_history.distributor_id=${dis_id} and topup_history.merchant_id=${merId}`;
    }
    // get admin topup history by date
    static getAdminTopupHistoryBySdate(s_date, page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
          from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where admin_distributors_topup.created_date like '${s_date}%' limit 100 offset ${100 * page_number}`;
    }
    // get admin topup history by date count
    static getAdminTopupHistoryBySdateCount(s_date) {
        return `select count(*) as admiTopupHistoryByDateCount
            from admin_distributors_topup where admin_distributors_topup.created_date like '${s_date}%'`;
    }
    // get admin topup history by date
    static getAdminTopupHistoryBySdateAndEnddate(s_date, e_date, page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
          from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where admin_distributors_topup.created_date between '${s_date}' and '${e_date}' limit 100 offset ${100 * page_number}`;
    }
    // get admin topup history by sdate and edate count
    static getAdminTopupHistoryBySdateAndEnddateCount(s_date, e_date) {
        return `select count(*) as admiTopupHistoryByDateCount
            from admin_distributors_topup where admin_distributors_topup.created_date between '${s_date}' and '${e_date}'`;
    }
    // get distibutor topup history by date
    static getDistibutorTopupHistoryBySdate(dis_id, s_date, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
    from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and topup_history.created_date like '${s_date}%' limit 100 offset ${100 * page_number}`;
    }
    // get distibutor topup history by date count
    static getDistibutorTopupHistoryBySdateCount(dis_id, s_date) {
        return `select count(*) as distibutorTopupHistoryByDateCount
      from topup_history where topup_history.distributor_id=${dis_id} and topup_history.created_date like '${s_date}%'`;
    }
    // get distibutor topup history by date
    static getDistibutorTopupHistoryBySdateAndEnddate(dis_id, s_date, e_date, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
    from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and topup_history.created_date between '${s_date}' and '${e_date}' limit 100 offset ${100 * page_number}`;
    }
    // get distibutor topup history by date count
    static getDistibutorTopupHistoryBySdateAndEnddateCount(dis_id, s_date, e_date) {
        return `select count(*) as distibutorTopupHistoryByDateCount
    from topup_history where topup_history.distributor_id=${dis_id} and topup_history.created_date between '${s_date}' and '${e_date}'`;
    }
    // get distibutor topup history by mobile
    static getDistibutorTopupHistoryByMobile(dis_id, mobile, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
  from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and  users.mobile='${mobile}' limit 100 offset ${100 * page_number}`;
    }
    // get distibutor topup history by mobile count
    static getDistibutorTopupHistoryByMobileCount(dis_id, mobile) {
        return `select count(*) as distibutorTopupHistoryCount
    from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and users.mobile='${mobile}'`;
    }
    // get admin topup history by mobile
    static getAdminTopupHistoryByMobile(mobile, page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
          from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where users.mobile='${mobile}' limit 100 offset ${100 * page_number}`;
    }
    // get admin topup history by mobile count
    static getAdminTopupHistoryByMobileCount(mobile) {
        return `select count(*) as adminTopupHistoryByMobileCount
            from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where users.mobile='${mobile}'`;
    }
    // get distibutor topup history by email
    //  *
    static getDistibutorTopupHistoryByEmail(dis_id, email, page_number) {
        return `select users.code as merchant_code,users.name as merchant_name,users.mobile,users.email,topup_history.amount,topup_history.created_date
  from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and users.email='${email}' limit 100 offset ${100 * page_number}`;
    }
    // get distibutor topup history by email
    //  *
    static getDistibutorTopupHistoryByEmailCount(dis_id, email) {
        return `select count(*) as distibutorTopupHistoryEmailCount
    from topup_history inner join users on topup_history.merchant_id=users.id where topup_history.distributor_id=${dis_id} and users.email='${email}'`;
    }
    // get admin topup history by email
    static getAdminTopupHistoryByEmail(email, page_number) {
        return `select users.code as distibutor_code,users.name as distibutor_name,users.mobile,users.email,admin_distributors_topup.amount,admin_distributors_topup.created_date
          from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where users.email='${email}' limit 100 offset ${100 * page_number}`;
    }
    // get admin topup history by email count
    static getAdminTopupHistoryByEmailCount(email) {
        return `select count(*) as adminTopupHistoryByEmailCount
          from admin_distributors_topup inner join users on admin_distributors_topup.distributor_id=users.id where users.email='${email}'`;
    }
}
exports.TopUpReloadQuery = TopUpReloadQuery;
