import axios from "axios";

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

export const sendMessage = async (mobile: string, message : string) => {

  if(mobile == null || mobile == '' || mobile == undefined)
  {
    return { err: true, message: "Not a valid mobile number.", data: "" };
  }
  if(mobile.startsWith('94') == false)
  {   
    mobile = '94' + (mobile.startsWith('0') ? mobile.slice(1, 10) : mobile);
  }

  axios.post('https://richcommunication.dialog.lk/api/sms/send', {
      messages : [
            {
              clientRef: "0777355075",
              number: mobile,
              mask: "Alles",
              text: message,
              campaignName:"GS_APP"
              }              
          ]
  },
  {
    headers: {
      USER: `user_alles`,
      DIGEST:   `2b2bb936bfa09075085bedcbec4c47f7`,
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
};