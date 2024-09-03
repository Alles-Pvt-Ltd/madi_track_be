"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiToken = void 0;
const axios_1 = require("axios");
const axiosInstacnce = axios_1.default.create({
    baseURL: 'https://login.ezlanka.lk/apiservice.asmx/',
});
// Add a request interceptor
// axiosInstacnce.interceptors.request.use(function (config) {
//     // const token = store.getState().session.token;
//     const tokenString = sessionStorage.getItem('token')
//     const userToken = JSON.parse(tokenString)
//     if (userToken) {
//     config.headers.auth_token =  userToken.token;
//     }
//     return config
//   })
exports.default = axiosInstacnce;
// export const apiToken='41e72417631841cdbdf00f16fbbe0c9e';
exports.apiToken = '7a69ee0439a04c94b9449bb7bf353b68';
