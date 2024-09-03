"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidersQuery = void 0;
class ProvidersQuery {
    //get all user
    // public static getAllServiceProviders() {
    //   return `select code,name from providers`;
    // };
    // services.code as service_code,type.code as type_id,
    // *
    static getAllProvidersDetails() {
        return `select services.code as service_code,services.name as service_name,type.code as type_code,type.name as type_name,providers.code as provider_code,ez_lanka_provider.name as providers_name,
    IF(type.id = '3' && providers_percentage.provider_percentage<0,-provider_percentage+admin_percentage+admin_distibutor_percentage ,
    IF(type.id = '5' || type.id = '7',-provider_percentage+admin_percentage+admin_distibutor_percentage,"")) as percentage  from 
    (((((map_service_type inner join map_type_provider on map_service_type.type_id=map_type_provider.type_id) 
    inner join type on map_type_provider.type_id=type.id) 
    inner join services on services.id=map_service_type.service_id) 
    inner join providers on map_type_provider.provider_id=providers.id)
    inner join providers_percentage on providers_percentage.provider_id=providers.id)
    inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id
    `;
    }
    //get all ez_lanka provider
    static getAllProviders() {
        // return `select providers.code,providers.providers_code,ez_lanka_provider.name as providers_name,ez_lanka_provider.code as ezlanka_providers_code,providers.is_enabled,type.code as type_code,type.name as type_name from
        // ((providers inner join map_type_provider on providers.id = map_type_provider.provider_id)
        // inner join type on type.id = map_type_provider.type_id)
        // inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id
        // where providers.is_deleted=0
        // `;
        //providers_name
        // return `select providers.code,providers.providers_code,ez_lanka_provider.name as providers_name,ez_lanka_provider.code as ezlanka_providers_code,providers.is_enabled,type.code as type_code,type.name as type_name,type.is_enabled as typeIsEnable,providers_percentage.provider_percentage,providers_percentage.admin_percentage,providers_percentage.admin_distibutor_percentage,providers_percentage.distributor_percentage,providers_percentage.merchants_percentage from (((providers inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id)
        return `select providers.code,ez_lanka_provider.name as ezlanka_provider_name,ez_lanka_provider.code as ezlanka_provider_code,providers.is_enabled,type.code as type_code,type.name as type_name,type.is_enabled as typeIsEnable,providers_percentage.provider_percentage,providers_percentage.admin_percentage,providers_percentage.admin_distibutor_percentage,providers_percentage.distributor_percentage,providers_percentage.merchants_percentage from (((providers inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id)
    inner join map_type_provider on providers.id = map_type_provider.provider_id) 
    inner join type on type.id = map_type_provider.type_id) 
    inner join providers_percentage on providers.id=providers_percentage.provider_id`;
    }
    //get ez_lanka provider
    static getProviders(page_number) {
        return `select providers.code,ez_lanka_provider.name as ezlanka_provider_name,ez_lanka_provider.code as ezlanka_provider_code,providers.is_enabled,type.code as type_code,type.name as type_name,type.is_enabled as typeIsEnable,providers_percentage.provider_percentage,providers_percentage.admin_percentage,providers_percentage.admin_distibutor_percentage,providers_percentage.distributor_percentage,providers_percentage.merchants_percentage from (((providers inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id)
    inner join map_type_provider on providers.id = map_type_provider.provider_id) 
    inner join type on type.id = map_type_provider.type_id) 
    inner join providers_percentage on providers.id=providers_percentage.provider_id
    where providers.is_deleted=0 limit 10 offset ${10 * page_number}`;
    }
    //get all ez_lanka provider
    static getProvidersCount() {
        return `select count(*) as providers_count
      from providers where providers.is_deleted=0`;
    }
    // add ez_lanka provider
    static addProvider(code, ez_lanka_provider_id, created_by, updated_by) {
        return `INSERT INTO providers (code,ez_lanka_provider_id,created_by,updated_by) VALUES ('${code}','${ez_lanka_provider_id}','${created_by}','${updated_by}')`;
    }
    // update ez_lanka provider
    static updateProvider(code, old_ez_lanka_provider_id, new_ez_lanka_provider_id, is_deleted, is_enabled, new_updated_by) {
        return `UPDATE providers
        SET code = '${code}',
        ez_lanka_provider_id='${new_ez_lanka_provider_id
            ? new_ez_lanka_provider_id
            : old_ez_lanka_provider_id}',
        is_enabled='${is_enabled}',
        is_deleted='${is_deleted}',
        updated_by='${new_updated_by}'
        WHERE code = '${code}'`;
    }
    // get provider details by code
    static getProviderByCode(code) {
        return `select id,code,providers_code as provider_code,ez_lanka_provider_id as ez_lanka_provider_id,is_deleted,is_enabled from providers where code='${code}'`;
    }
    // add map_service_type
    static addMapTypeProvider(type_id, provider_id) {
        return `INSERT INTO map_type_provider (type_id,provider_id) VALUES ('${type_id}','${provider_id}')`;
    }
    // get role details by code
    static getAllDetailsOfProviderByCode(code) {
        return `select * from providers where code='${code}'`;
    }
    // update map type provider
    static updateMapProviderType(provider_id, type_id) {
        return `UPDATE map_type_provider
          SET provider_id = ${provider_id},
          type_id=${type_id}
          WHERE provider_id = ${provider_id}`;
    }
    // update provider commission percentage
    static updateAdminCommission(commission, id) {
        return `UPDATE providers_percentage
          SET admin_percentage = ${commission}
          WHERE provider_id = ${id}`;
    }
    // update provider commission percentage
    static updateAdminDistibtorCommission(commission, id) {
        return `UPDATE providers_percentage
          SET admin_distibutor_percentage = ${commission}
          WHERE provider_id = ${id}`;
    }
    // update provider commission percentage
    static updateDistibutorCommission(commission, id) {
        return `UPDATE providers_percentage
          SET distributor_percentage = ${commission}
          WHERE provider_id = ${id}`;
    }
    // update provider commission percentage
    static updateMerchantCommission(commission, id) {
        return `UPDATE providers_percentage
          SET merchants_percentage = ${commission}
          WHERE provider_id = ${id}`;
    }
    // get provider percentage details by code
    static getProviderPercentageById(id) {
        return `select provider_percentage,admin_percentage,admin_distibutor_percentage,distributor_percentage,merchants_percentage from providers_percentage where provider_id='${id}'`;
    }
    // add ez_lanka provider
    static addProviderPrecentage(provider_id, provider_percentage) {
        return `INSERT INTO providers_percentage (provider_id,provider_percentage) VALUES ('${provider_id}','${provider_percentage}')`;
    }
    // update provider commission percentage
    static updateProviderPercentage(id, commission) {
        return `UPDATE providers_percentage
            SET provider_percentage = ${commission},
            admin_percentage=0,
            admin_distibutor_percentage=0,
            distributor_percentage=0,
            merchants_percentage=0
            WHERE provider_id = ${id}`;
    }
    // get distibutor commission
    static getDistibutorCommission(page_number) {
        return `select ez_lanka_provider.name,providers_percentage.admin_distibutor_percentage
          from (providers inner join providers_percentage on providers_percentage.provider_id=providers.id) inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id limit 10 offset ${10 * page_number}`;
    }
    // get distibutor commission count
    static getDistibutorCommissionCount() {
        return `select count(*) as distibutorCommisssionCount
          from providers`;
    }
    // add package
    static addPackage(code, package_name) {
        return `INSERT INTO package (code,package_name) VALUES ('${code}','${package_name}')`;
    }
    // add package details
    static addPackageDetails(package_id, provider_id, provider_percentage, admin_distibutor_percentage) {
        return `INSERT INTO package_details (package_id,provider_id,provider_percentage,admin_distibutor_percentage) VALUES (${package_id},'${provider_id}',${provider_percentage},${admin_distibutor_percentage})`;
    }
    // get package details
    static getPackage(page_number) {
        return `select code,package_name from package limit 2 offset ${2 * page_number}`;
    }
    //get all ez_lanka provider
    static getPackageCount() {
        return `select count(*) as packages_count
      from package where package.is_deleted=0`;
    }
    //get all ez_lanka provider
    static getPackageByCode(code) {
        return `select package.package_name,package_details.provider_id,package_details.provider_percentage,package_details.admin_distibutor_percentage,ez_lanka_provider.name as provider_name
        from ((package inner join package_details on package_details.package_id=package.id) inner join providers on package_details.provider_id=providers.id) inner join ez_lanka_provider on ez_lanka_provider.id=providers.ez_lanka_provider_id where package.is_deleted=0 and package.code='${code}'`;
    }
}
exports.ProvidersQuery = ProvidersQuery;
