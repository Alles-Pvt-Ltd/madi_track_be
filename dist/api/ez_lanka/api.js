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
exports.getBalance = exports.getStatus = exports.recharge = void 0;
const base_1 = require("../axios/base");
const base_2 = require("../axios/base");
const xml2js = require("xml2js");
const recharge = (mobile, opcode, amount, reqid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("7" + base_2.apiToken);
    const response = yield base_1.default.get("Recharge", {
        params: {
            apiToken: base_2.apiToken,
            mn: mobile,
            op: opcode,
            amt: amount,
            reqid: reqid,
            field1: "",
            field2: "",
        },
    });
    var data = response.data;
    var errorCode;
    xml2js.parseString(data, (err, result) => {
        if (err) {
            throw err;
        }
        const json = result;
        errorCode = json.Result;
    });
    // console.log(errorCode);
    return errorCode;
});
exports.recharge = recharge;
const getStatus = (reqid) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield base_1.default.get("GetRechargeStatus", {
        params: {
            apiToken: base_2.apiToken,
            reqid: reqid,
        },
    });
    var data = response.data;
    var errorCode;
    xml2js.parseString(data, (err, result) => {
        if (err) {
            throw err;
        }
        const json = result;
        errorCode = json.Result;
    });
    return errorCode;
});
exports.getStatus = getStatus;
const getBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield base_1.default.get("GetBalanceNew", {
        params: {
            apiToken: base_2.apiToken,
        },
    });
    var data = response.data;
    var errorCode;
    xml2js.parseString(data, (err, result) => {
        if (err) {
            throw err;
        }
        const json = result;
        errorCode = json.Wallet;
    });
    return errorCode;
});
exports.getBalance = getBalance;
