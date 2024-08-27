"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringConstant = void 0;
class StringConstant {
    constructor() {
        this.emailPasswordMismatch = "Email or Password incorrect";
        this.unableGet = "Unable to get data for this user code";
        this.unableGetData = "Unable to get data";
        this.passwordMissMatch = "Phone Number or Password incorrect";
        this.notAccess = "you do not have permition";
        this.notEnoughMoney = "You don't have enough money to reload";
        this.notEnoughMoneyToTopup = "You don't have enough money to topup";
        this.notEnoughMoneyToReload = "You don't have enough money to reload";
        this.merchantsCanNot = "Merchants or admin can not have access to add user";
        this.emailAlreadyExist = "Email already exist";
        this.phoneNumberAlreadyExist = "Phone number already exist";
        this.reloadError = "we got error in reload ";
        this.getStatusError = "we got get status error in reload ";
        this.noPending = "We do not have Pending reload";
        this.roleExist = "we have this role already";
        this.merchantDonotHaveEnaughMoney = "merchant do not have enough money";
        this.userDisabled = "user disabled";
        this.userDeleted = "user deleted";
        this.merchantsOrDistibutorCanNot = "Merchants or distibutor can not have access to add provider";
        this.providerExist = "we have this provider already";
        this.serviceExist = "we have this service already";
        this.serviceCodeExist = "we have this service code already";
        this.typeExist = "we have this type already";
        this.typeCodeExist = "we have this type code already";
        this.providerCodeExist = "we have this provider code already";
        this.enterCorrectPercebtage = "Enter Correct Percentage, total commission is ";
        this.providerCodeAlreadyExist = "Provider code already exist";
        this.ezlanakaProviderCodeAlreadyExist = "Ezlanka Provider code already exist";
        this.ezlanakaProviderNameAlreadyExist = "Ezlanka Provider name already exist";
        this.enterCorrectDate = "Enter correct date";
    }
}
exports.StringConstant = StringConstant;
StringConstant.usernamePasswordMismatch = "Username or Password incorrect";
class AppConstant {
    constructor() {
        this.baseURL = "/api/v1";
    }
}
exports.default = AppConstant;
