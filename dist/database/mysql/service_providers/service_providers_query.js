"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    //get all user
    // public static getAllServiceProviders() {
    //   return `select code,name from providers`;
    // };
    // services.code as service_code,type.code as type_id,
    // *
    static getAllServiceProviders() {
        return `select services.code as service_code,type.code as type_code,providers.code,providers.name as providers_name,
    IF(type.id = '3' && providers_percentage.provider_percentage<0,-provider_percentage+admin_percentage+admin_distibutor_percentage ,
    IF(type.id = '5' || type.id = '7',-provider_percentage+admin_percentage+admin_distibutor_percentage,"")) as percentage  from 
    (((map_service_type inner join map_type_provider on map_service_type.type_id=map_type_provider.type_id) 
    inner join type on map_type_provider.type_id=type.id) 
    inner join services on services.id=map_service_type.service_id) 
    inner join providers on map_type_provider.provider_id=providers.id
    inner join providers_percentage on providers_percentage.provider_id=providers.id`;
    }
    ;
}
exports.Query = Query;
