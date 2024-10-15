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
exports.sendMessage = void 0;
const axios_1 = require("axios");
// export const getTextMessageInput = (recipient: string, text: string) => {
//   return JSON.stringify({
//     messaging_product: "whatsapp",
//     preview_url: false,
//     recipient_type: "individual",
//     to: recipient,
//     type: "text",
//     text: {
//       body: text,
//     },
//   });
// };
// const axiosSMSApi = axios.create({
//   baseURL: "https://richcommunication.dialog.lk/api/",
// });
const sendMessage = (mobile, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (mobile == null || mobile == '' || mobile == undefined) {
        return { err: true, message: "Not a valid mobile number.", data: "" };
    }
    if (mobile.startsWith('94') == false) {
        mobile = '94' + (mobile.startsWith('0') ? mobile.slice(1, 10) : mobile);
    }
    axios_1.default.post('https://richcommunication.dialog.lk/api/sms/send', {
        messages: [
            {
                clientRef: "0777355075",
                number: mobile,
                mask: "Alles",
                text: message,
                campaignName: "GS_APP"
            }
        ]
    }, {
        headers: {
            USER: `user_alles`,
            DIGEST: `2b2bb936bfa09075085bedcbec4c47f7`,
            CREATED: ``,
            "Content-Type": "application/json",
        }
    })
        .then(function (response) {
    })
        .catch(function (error) {
        console.log(error);
    });
    return { err: false, message: "message submitted to send", data: "" };
});
exports.sendMessage = sendMessage;
