"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = void 0;
const connection_1 = require("../connection");
const providers_query_1 = require("./providers_query");
const user_query_1 = require("../users/user_query");
const constant_1 = require("../../../config/constant");
const type_query_1 = require("../service_type/type_query");
const ez_lanka_query_1 = require("../ez_lanka/ez_lanka_query");
class Providers {
    constructor() {
        this.stringConstant = new constant_1.StringConstant();
    }
    // get all type providers
    getAllProviders(req, cb) {
        // get all type providers query
        const getAllroviders = providers_query_1.ProvidersQuery.getAllProviders();
        // console.log(getAllroviders);
        // get all type providers
        return connection_1.default.connct(getAllroviders, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            return cb(err, d, da);
        });
    }
    // get type providers
    getProviders(req, cb) {
        const page_num = req.params.page_num;
        // get type providers query
        const getProviders = providers_query_1.ProvidersQuery.getProviders(page_num);
        // console.log(getAllroviders);
        // get type providers
        return connection_1.default.connct(getProviders, req, (err, providers, da) => {
            if (err) {
                return cb(err, providers, da);
            }
            var getProvidersCount = providers_query_1.ProvidersQuery.getProvidersCount();
            // get role
            return connection_1.default.connct(getProvidersCount, req, (err, count, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, count, sys_da.body);
                }
                // by using this we deside how many pages we need
                const page_count = count[0].providers_count / 10;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var provider = {
                    page_array: page_array,
                    providers: providers,
                    providers_count: count,
                };
                return cb(err, provider, sys_da.body);
            });
        });
    }
    // get all type providers
    getProviderByCode(req, cb) {
        //  provider code
        const provider_code = req.params.code;
        // get all type providers query
        const getProviderByCode = providers_query_1.ProvidersQuery.getProviderByCode(provider_code);
        // get all type providers
        return connection_1.default.connct(getProviderByCode, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, da.body);
            }
            const getProviderById = d[0].id;
            const getProviderPercentageById = providers_query_1.ProvidersQuery.getProviderPercentageById(getProviderById);
            // get all type providers
            return connection_1.default.connct(getProviderPercentageById, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                if (d.length < 1) {
                    return cb(this.stringConstant.unableGet, d, da.body);
                }
                return cb(err, d, da);
            });
        });
    }
    // get all type providers
    getAllProvidersDetails(req, cb) {
        // get all type providers query
        const getAllProvidersDetails = providers_query_1.ProvidersQuery.getAllProvidersDetails();
        // get all type providers
        return connection_1.default.connct(getAllProvidersDetails, req, (err, d, da) => {
            return cb(err, d, da);
        });
    }
    // add provider
    addProvider(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role query
            const findCreatorRole = user_query_1.Query.findCreatorRole(req.user.id);
            // get role
            return connection_1.default.connct(findCreatorRole, req, (err, d, sys_da) => {
                const user_roleid = d;
                if (err) {
                    return cb(err, user_roleid, sys_da.body);
                }
                if (user_roleid.length < 1) {
                    return cb(this.stringConstant.unableGet, user_roleid, sys_da.body);
                }
                //   admin and supper can only create create provider
                if (user_roleid[0].role_id !== 2 && user_roleid[0].role_id !== 1) {
                    return cb(this.stringConstant.merchantsOrDistibutorCanNot, user_roleid, sys_da.body);
                }
                // // get all providers
                // var getAllProviders = ProvidersQuery.getAllProviders();
                // // get all providers
                // return Mysql.connct(getAllProviders, req, (err, d, sys_da) => {
                //   // if we got error
                //   if (err) {
                //     return cb(err, d, sys_da.body);
                //   }
                //   // if we did not got error
                //   if (d.length < 1) {
                //     return cb(this.stringConstant.unableGet, d, sys_da.body);
                //   }
                // // convert new provider into lover case letter
                // const new_provider = AppFucntion.trimAndLovercase(req.body.name);
                // // check new provider already exist or not
                // const povider = d.find((provider) => {
                //   console.log(provider);
                //   const exist_provider = AppFucntion.trimAndLovercase(
                //     provider.providers_name
                //   );
                //   return exist_provider === new_provider;
                // });
                // console.log("85");
                // // if provider already exist
                // if (povider) {
                //   return cb(this.stringConstant.providerExist, d, req.body);
                // }
                const ezlanka_provider_code = req.body.ezlanka_provider_code;
                const getEz_lankaProviderByCode = ez_lanka_query_1.Ez_lankaQuery.getEz_lankaProviderByCode(ezlanka_provider_code);
                // // get ezlanka providers by code
                return connection_1.default.connct(getEz_lankaProviderByCode, req, (err, d, sys_da) => {
                    // if we got error
                    if (err) {
                        return cb(err, d, sys_da.body);
                    }
                    // if we did not got error
                    if (d.length < 1) {
                        return cb(this.stringConstant.unableGet, d, sys_da.body);
                    }
                    // const name = req.body.name;
                    const code = req.body.code;
                    // const provider_code = req.body.provider_code;
                    const ez_lanka_provider_id = d[0].id;
                    const created_by = req.user.id;
                    const updated_by = null;
                    const addProvider = providers_query_1.ProvidersQuery.addProvider(code, ez_lanka_provider_id, created_by, updated_by);
                    // add provider
                    return connection_1.default.connct(addProvider, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        const providerId = d.insertId;
                        const type_code = req.body.type_code;
                        const getAllDetailsOfTypeByCode = type_query_1.TypeQuery.getAllDetailsOfTypeByCode(type_code);
                        // get role
                        return connection_1.default.connct(getAllDetailsOfTypeByCode, req, (err, d, sys_da) => {
                            // if we got error
                            if (err) {
                                return cb(err, d, sys_da.body);
                            }
                            const typeId = d[0].id;
                            const addMapTypeProvider = providers_query_1.ProvidersQuery.addMapTypeProvider(typeId, providerId);
                            return connection_1.default.connct(addMapTypeProvider, req, (err, d, sys_da) => {
                                // if we got error
                                if (err) {
                                    return cb(err, d, sys_da.body);
                                }
                                const provider_percentage = req.body.provider_percentage;
                                const addProviderPrecentage = providers_query_1.ProvidersQuery.addProviderPrecentage(providerId, provider_percentage);
                                return connection_1.default.connct(addProviderPrecentage, req, (err, d, sys_da) => {
                                    // if we got error
                                    if (err) {
                                        return cb(err, d, sys_da.body);
                                    }
                                    return cb(err, d, sys_da.body);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    // update provider
    updateProvider(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get provider by code query
            const getProviderByCode = providers_query_1.ProvidersQuery.getProviderByCode(req.params.code);
            // get provider by code
            return connection_1.default.connct(getProviderByCode, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da.body);
                }
                //old provider data by code
                const oldProviderData = d[0];
                if (!oldProviderData) {
                    return cb(this.stringConstant.unableGet, d, da);
                }
                // we are goin to use this function in two place
                const suportFunction = (ez_lanka_provider_id) => {
                    if (!req.body.is_deleted && req.body.is_deleted !== 0) {
                        req.body.is_deleted = oldProviderData.is_deleted;
                    }
                    if (!req.body.is_enabled && req.body.is_enabled !== 0) {
                        req.body.is_enabled = oldProviderData.is_enabled;
                    }
                    const code = req.params.code;
                    const new_ez_lanka_provider_id = ez_lanka_provider_id;
                    const old_ez_lanka_provider_id = oldProviderData.ez_lanka_provider_id;
                    const old_provider_code = oldProviderData.provider_code;
                    // const new_provider_code = req.body.provider_code;
                    const is_deleted = req.body.is_deleted;
                    const is_enabled = req.body.is_enabled;
                    const new_updated_by = req.user.id;
                    const updateProvider = providers_query_1.ProvidersQuery.updateProvider(code, old_ez_lanka_provider_id, new_ez_lanka_provider_id, is_deleted, is_enabled, new_updated_by);
                    return connection_1.default.connct(updateProvider, req, (err, d, da) => {
                        if (err) {
                            return cb(err, d, da.body);
                        }
                        const getAllDetailsOfProviderByCode = providers_query_1.ProvidersQuery.getAllDetailsOfProviderByCode(code);
                        return connection_1.default.connct(getAllDetailsOfProviderByCode, null, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da.body);
                            }
                            if (req.body.type_code) {
                                const provider_id = d[0].id;
                                const getAllDetailsOfTypeByCode = type_query_1.TypeQuery.getAllDetailsOfTypeByCode(req.body.type_code);
                                return connection_1.default.connct(getAllDetailsOfTypeByCode, req, (err, d, da) => {
                                    if (err) {
                                        return cb(err, d, da.body);
                                    }
                                    const type_id = d[0].id;
                                    const updateMapProviderType = providers_query_1.ProvidersQuery.updateMapProviderType(provider_id, type_id);
                                    console.log(updateMapProviderType);
                                    return connection_1.default.connct(updateMapProviderType, req, (err, d, da) => {
                                        if (err) {
                                            return cb(err, d, da.body);
                                        }
                                        const provider_percentage = req.body.provider_percentage;
                                        if (provider_percentage) {
                                            const updateProviderPercentage = providers_query_1.ProvidersQuery.updateProviderPercentage(provider_id, provider_percentage);
                                            console.log(updateProviderPercentage);
                                            return connection_1.default.connct(updateProviderPercentage, req, (err, d, sys_da) => {
                                                // if we got error
                                                if (err) {
                                                    return cb(err, d, sys_da.body);
                                                }
                                                return cb(err, d, sys_da.body);
                                            });
                                        }
                                        else {
                                            return cb(err, d, da);
                                        }
                                    });
                                });
                            }
                            else {
                                return cb(err, d, da);
                            }
                        });
                    });
                };
                // const providerSupportFunction = (ez_lanka_provider_id) => {
                //   // convert new role into lover case letter
                //   // const new_provider_code = AppFucntion.trimAndLovercase(
                //   //   req.body.provider_code
                //   // );
                //   // const providerCodeExist = d.find((provider) => {
                //   //   const exist_provider_code = AppFucntion.trimAndLovercase(
                //   //     provider.provider_code
                //   //   );
                //   //   return exist_provider_code === new_provider_code;
                //   // });
                //   // if provider already exist
                //   // if (providerCodeExist) {
                //   //   return cb(this.stringConstant.providerCodeExist, d, req.body);
                //   // }
                //   return suportFunction(ez_lanka_provider_id);
                // };
                if (req.body.ezlanka_provider_code) {
                    const ezlanka_provider_code = req.body.ezlanka_provider_code;
                    const getEz_lankaProviderByCode = ez_lanka_query_1.Ez_lankaQuery.getEz_lankaProviderByCode(ezlanka_provider_code);
                    // get ezlanka providers by code
                    return connection_1.default.connct(getEz_lankaProviderByCode, req, (err, d, sys_da) => {
                        // if we got error
                        if (err) {
                            return cb(err, d, sys_da.body);
                        }
                        // if we did not got error
                        if (d.length < 1) {
                            return cb(this.stringConstant.unableGet, d, sys_da.body);
                        }
                        const ez_lanka_provider_id = d[0].id;
                        if (req.body.provider_code &&
                            req.body.provider_code !== oldProviderData.provider_code) {
                            return suportFunction(ez_lanka_provider_id);
                        }
                        else {
                            return suportFunction(ez_lanka_provider_id);
                        }
                    });
                }
                // else if (
                //   req.body.provider_code && req.body.provider_code !== oldProviderData.provider_code
                // ) {
                //   // console.log("343");
                //   return providerSupportFunction(null);
                // }
                else {
                    return suportFunction(null);
                }
                // });
            });
        });
    }
    // update commission
    updateCommission(req, cb) {
        var provider_code = req.params.provider_code;
        var adminCommission = req.body.adminCommission;
        var adminDistibutorCommission = req.body.adminDistibutorCommission;
        var distibutorCommission = req.body.distibutorCommission;
        var merchantCommission = req.body.merchantCommission;
        // console.log(distibutorCommission);
        const getAllDetailsOfProviderByCode = providers_query_1.ProvidersQuery.getAllDetailsOfProviderByCode(provider_code);
        // get all type providers
        return connection_1.default.connct(getAllDetailsOfProviderByCode, req, (err, d, da) => {
            if (err) {
                return cb(err, d, da);
            }
            if (d.length < 1) {
                return cb(this.stringConstant.unableGet, d, da.body);
            }
            const provider_id = d[0].id;
            const getProviderPercentageById = providers_query_1.ProvidersQuery.getProviderPercentageById(provider_id);
            return connection_1.default.connct(getProviderPercentageById, req, (err, d, da) => {
                if (err) {
                    return cb(err, d, da);
                }
                if (d.length < 1) {
                    return cb(this.stringConstant.unableGet, d, da.body);
                }
                const provider_percentage = d[0].provider_percentage;
                const admin_distibutor_percentage = d[0].admin_distibutor_percentage;
                const admin_percentage = d[0].admin_percentage;
                const distributor_percentage = d[0].distributor_percentage;
                const merchants_percentage = d[0].merchants_percentage;
                if (adminCommission || adminCommission == 0) {
                    // update admin commission query
                    if (provider_percentage >=
                        adminCommission + admin_distibutor_percentage) {
                        const updateAdminCommission = providers_query_1.ProvidersQuery.updateAdminCommission(adminCommission, provider_id);
                        console.log(updateAdminCommission);
                        // update admin commission
                        return connection_1.default.connct(updateAdminCommission, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da.body);
                            }
                            return cb(err, d, da);
                        });
                    }
                    else {
                        return cb(this.stringConstant.enterCorrectPercebtage + provider_percentage, d, da.body);
                    }
                }
                else if (adminDistibutorCommission ||
                    adminDistibutorCommission == 0) {
                    if (provider_percentage >=
                        adminDistibutorCommission + admin_percentage) {
                        // update admin distibutor commission query
                        const updateAdminDistibtorCommission = providers_query_1.ProvidersQuery.updateAdminDistibtorCommission(adminDistibutorCommission, provider_id);
                        // update admin distibutor commission
                        return connection_1.default.connct(updateAdminDistibtorCommission, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da.body);
                            }
                            return cb(err, d, da);
                        });
                    }
                    else {
                        return cb(this.stringConstant.enterCorrectPercebtage + provider_percentage, d, da.body);
                    }
                }
                else if (distibutorCommission || distibutorCommission == 0) {
                    if (admin_distibutor_percentage >=
                        distibutorCommission + merchants_percentage) {
                        // update distibutor commission query
                        const updateDistibutorCommission = providers_query_1.ProvidersQuery.updateDistibutorCommission(distibutorCommission, provider_id);
                        // update distibutor commission
                        return connection_1.default.connct(updateDistibutorCommission, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da.body);
                            }
                            return cb(err, d, da);
                        });
                    }
                    else {
                        return cb(this.stringConstant.enterCorrectPercebtage +
                            admin_distibutor_percentage, d, da.body);
                    }
                }
                else if (merchantCommission || merchantCommission == 0) {
                    if (admin_distibutor_percentage >=
                        merchantCommission + distributor_percentage) {
                        // update merchant commission query
                        const updateMerchantCommission = providers_query_1.ProvidersQuery.updateMerchantCommission(merchantCommission, provider_id);
                        // update merchant commission query
                        return connection_1.default.connct(updateMerchantCommission, req, (err, d, da) => {
                            if (err) {
                                return cb(err, d, da);
                            }
                            if (d.length < 1) {
                                return cb(this.stringConstant.unableGet, d, da.body);
                            }
                            return cb(err, d, da);
                        });
                    }
                    else {
                        return cb(this.stringConstant.enterCorrectPercebtage +
                            admin_distibutor_percentage, d, da.body);
                    }
                }
            });
        });
    }
    getDistibutorCommission(req, cb) {
        const page_num = req.params.page_num;
        var getDistibutorCommission = providers_query_1.ProvidersQuery.getDistibutorCommission(page_num);
        return connection_1.default.connct(getDistibutorCommission, req, (err, data, da) => {
            if (err) {
                return cb(err, data, da);
            }
            var getDistibutorCommissionCount = providers_query_1.ProvidersQuery.getDistibutorCommissionCount();
            // get services
            return connection_1.default.connct(getDistibutorCommissionCount, req, (err, count, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, count, sys_da.body);
                }
                // by using this we deside how many pages we need
                const page_count = count[0].distibutorCommisssionCount / 10;
                console.log(page_count);
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var Provider = { page_array: page_array, Providers: data };
                return cb(err, Provider, sys_da.body);
            });
        });
    }
    // add provider
    addPackage(req, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // get role query
            const findCreatorRole = user_query_1.Query.findCreatorRole(req.user.id);
            // get role
            return connection_1.default.connct(findCreatorRole, req, (err, d, sys_da) => {
                const user_roleid = d;
                if (err) {
                    return cb(err, user_roleid, sys_da.body);
                }
                if (user_roleid.length < 1) {
                    return cb(this.stringConstant.unableGet, user_roleid, sys_da.body);
                }
                //   admin and supper can only create create provider
                if (user_roleid[0].role_id !== 2 && user_roleid[0].role_id !== 1) {
                    return cb(this.stringConstant.merchantsOrDistibutorCanNot, user_roleid, sys_da.body);
                }
                const code = req.body.code;
                const package_name = req.body.package_name;
                const package_details = req.body.package;
                const addPackage = providers_query_1.ProvidersQuery.addPackage(code, package_name);
                // get package
                return connection_1.default.connct(addPackage, req, (err, d, sys_da) => {
                    if (err) {
                        return cb(err, user_roleid, sys_da.body);
                    }
                    const package_id = d.insertId;
                    const pacage_length = package_details.length;
                    var i = 0;
                    package_details.forEach((package_detail) => {
                        const getProviderByCode = providers_query_1.ProvidersQuery.getProviderByCode(package_detail.provider_code);
                        return connection_1.default.connct(getProviderByCode, req, (err, d, sys_da) => {
                            if (err) {
                                return cb(err, d, sys_da.body);
                            }
                            const provider_id = d[0].id;
                            const addPackageDetails = providers_query_1.ProvidersQuery.addPackageDetails(package_id, provider_id, package_detail.provider_percentage, package_detail.admin_gave_commission_to_distibutor);
                            return connection_1.default.connct(addPackageDetails, req, (err, d, sys_da) => {
                                if (err) {
                                    return cb(err, d, sys_da.body);
                                }
                                i++;
                                console.log(i);
                                if (pacage_length == i) {
                                    return cb(err, d, sys_da.body);
                                }
                            });
                        });
                    });
                    // package_details.map((package_detail)=>{
                    //   })
                });
            });
        });
    }
    // get type providers
    getPackage(req, cb) {
        const page_num = req.params.page_num;
        // get all type providers query
        const getPackage = providers_query_1.ProvidersQuery.getPackage(page_num);
        // console.log(getAllroviders);
        // get all type providers
        return connection_1.default.connct(getPackage, req, (err, packages, da) => {
            if (err) {
                return cb(err, packages, da);
            }
            var getPackageCount = providers_query_1.ProvidersQuery.getPackageCount();
            // get role
            return connection_1.default.connct(getPackageCount, req, (err, count, sys_da) => {
                // if we got error
                if (err) {
                    return cb(err, count, sys_da.body);
                }
                // by using this we deside how many pages we need
                const page_count = count[0].packages_count / 2;
                // we create an array with the initial value 1
                var page_array = [1];
                // we insert the page number in to the array(in react some point i can not do the for loop so that i will use map function for this array to loop)
                for (let index = 2; index < page_count + 1; index++) {
                    page_array[index - 1] = index;
                }
                var provider = {
                    page_array: page_array,
                    packages: packages,
                    packages_count: count,
                };
                return cb(err, provider, sys_da.body);
            });
        });
    }
    // get provider package by code
    getPackageByCode(req, cb) {
        const package_code = req.params.code;
        // get all type providers query
        const getPackageByCode = providers_query_1.ProvidersQuery.getPackageByCode(package_code);
        console.log(getPackageByCode);
        // get all type providers
        return connection_1.default.connct(getPackageByCode, req, (err, packages, da) => {
            if (err) {
                return cb(err, packages, da);
            }
            return cb(err, packages, da.body);
        });
    }
}
exports.Providers = Providers;
