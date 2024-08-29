// import { Request, Response } from "express";
// import {
//   sqlError,
//   successResponse,
//   validationError,
//   notFound,
//   forbidden,
//   commenError,
// } from "../../modules/common/service";
// import e = require("express");
// import { Users } from "../../database/mysql/users/users";
// import { AppFucntion } from "../../app/app_function";
// import { IUser } from "../../interfaces/user_interface";
// import { validationResult } from "express-validator";
// import { StringConstant } from "../../config/constant";
// export class UserController {
//   private stringConstant = new StringConstant();
//   private user: Users = new Users();
//   public async login(req: Request, res: Response) {
//     const validation = await validationResult(req).array(); //here we validate user request before create post
//     // if we have validation error
//     if (validation[0]) {
//       return validationError(validation[0].msg, req.body, res);
//     }
//     this.user.login(req, res, (err, d, sys_da) => {
//       if (err) {
//         return sqlError("", res);
//       } else {
//         if (!d[0]) {
//           return notFound(sys_da, res);
//         }
//         // if (d[0].is_enabled == 0) {
//         //   return successResponse("user deactivated", req.body, res);
//         // }
//         const comparePassword = AppFucntion.passwordVerify(
//           req.body.password,
//           d[0].password
//         );
//         if (!comparePassword) {
//           return forbidden(this.stringConstant.passwordMissMatch, sys_da, res);
//         }
//         const token = AppFucntion.createJwtToken(d[0].code, d[0].role_id);
//         const userDet: any = {};
//         userDet.image = d[0].image;
//         userDet.name = d[0].name;
//         userDet.code = d[0].code;
//         userDet.role_id = d[0].role_id;
//         userDet.token = token;
//         userDet.token = token;
//         userDet.login_time = new Date(Date.now());
//         return successResponse("login successfull", userDet, res);
//       }
//     });
//   }
//   public async addRegistration(req: any, res: Response) {
//     const validation = await validationResult(req).array(); //here we validate user request before create post
//     // if we have validation error
//     if (validation[0]) {
//       return validationError(validation[0].msg, req.body, res);
//     }
//     // create code for user
//     const code = AppFucntion.uuid();
//     // encrypt given password
//     req.body.password = AppFucntion.encryptPassword(req.body.password);
//     const created_by: string = req.user.id;
//     const updated_by: string = null;
//     // we add values to inter face IUser
//     const user_params: IUser = {
//       code: code,
//       req: req,
//       created_by: created_by,
//       updated_by: updated_by,
//       user: created_by,
//     };
//     this.user.addRegister(user_params, (err, d, da) => {
//       const errorType = typeof err;
//       console.log("97" + err);
//       if (errorType == "boolean" && err == true) {
//         return sqlError("", res);
//       } else if (err) {
//         return commenError(err, da, res);
//       } else {
//         return successResponse("create user successfull", d, res);
//       }
//     });
//   }
//   public getAllUser(req: Request, res: Response) {
//     this.user.getAllUser(req, (err, d, da) => {
//       if (err) {
//         return sqlError(err, res);
//       } else {
//         return successResponse("get all users successfull", d, res);
//       }
//     });
//   }
//   public getUserById(req: Request, res: Response) {
//     this.user.getUserById(req, (err, d, da) => {
//       if (err) {
//         return sqlError("", res);
//       } else {
//         return successResponse("get user successfull", d, res);
//       }
//     });
//   }
//   public getUserByMobileNo(req: Request, res: Response) {
//     this.user.getUserByMobileNo(req, (err, d, da) => {
//       if (err) {
//         return sqlError("", res);
//       } else {
//         return successResponse("get user successfull", d, res);
//       }
//     });
//   }
//   public getUserByName(req: Request, res: Response) {
//     this.user.getUserByName(req, (err, d, da) => {
//       if (err) {
//         return sqlError("", res);
//       } else {
//         return successResponse("get user successfull", d, res);
//       }
//     });
//   }
//   public async updateUser(req: any, res: Response) {
//     const validation = await validationResult(req).array(); //here we validate user request before create post
//     // if we have validation error
//     if (validation[0]) {
//       return validationError(validation[0].msg, req.body, res);
//     }
//     const updated_by = req.user.id;
//     // insert values into IUser interFaces
//     const user_params: IUser = {
//       code: null,
//       req: req,
//       created_by: null,
//       updated_by: updated_by,
//       user: null,
//     };
//     this.user.updateUser(user_params, (err, d, da) => {
//       const errorToString = String(d);
//       //  here we check that , we get error by updating existing values eg:email or phone number
//       const errorByDublicate = errorToString.includes("ER_DUP_ENTRY");
//       const errorType = typeof err;
//       if (errorType == "boolean" && err == true) {
//         if (errorByDublicate) {
//           // mobile number duplicate entry
//           const errorByDublicateMobile = errorToString.includes(
//             "users.mobile_UNIQUE"
//           );
//           // email duplicate entry
//           const errorByDublicateEmail = errorToString.includes("users.email_UNIQUE");
//           if (errorByDublicateMobile) {
//             return commenError(
//               this.stringConstant.phoneNumberAlreadyExist,
//               da,
//               res
//             );
//           } else if (errorByDublicateEmail) {
//             return commenError(this.stringConstant.emailAlreadyExist, da, res);
//           }
//         }
//         return sqlError("", res);
//       } else if (err) {
//         return commenError(err, da, res);
//       } else {
//         return successResponse("user update successfully", d, res);
//       }
//     });
//   }
//   public async deleteUser(req: any, res: Response) {
//     const validation = await validationResult(req).array(); //here we validate user request before create post
//     // if we have validation error
//     if (validation[0]) {
//       return validationError(validation[0].msg, req.body, res);
//     }
//     const updated_by = req.user.id;
//     // insert values into IUser interFaces
//     const user_params: IUser = {
//       code: null,
//       req: req,
//       created_by: null,
//       updated_by: updated_by,
//       user: null,
//     };
//     this.user.updateUser(user_params, (err, d, da) => {
//       const errorType = typeof err;
//       if (errorType == "boolean" && err == true) {
//         return sqlError("", res);
//       } else if (err) {
//         return commenError(err, da, res);
//       } else {
//         return successResponse("user delete successfully", d, res);
//       }
//     });
//   }
//   public getMerchantByDistubuterId(req: Request, res: Response) {
//     this.user.getMerchantByDistubuterId(req, (err, d, da) => {
//       const errorType = typeof err;
//       if (errorType == "boolean" && err == true) {
//         return sqlError("", res);
//       } else if (err) {
//         return commenError(err, da, res);
//       } else {
//         return successResponse(
//           "get merchant by dstubuter id successfull",
//           d,
//           res
//         );
//       }
//     });
//   }
//   public getAllDistubuter(req: Request, res: Response) {
//     this.user.getAllDistubuter(req, (err, d, da) => {
//       if (err) {
//         return sqlError(err, res);
//       } else {
//         return successResponse("get all dstubuters successfull", d, res);
//       }
//     });
//   }
// }
// // public create_user(req: Request, res: Response) {
// //     // this check whether all the filds were send through the erquest or not
// //     if (req.body.name && req.body.name.first_name && req.body.name.middle_name && req.body.name.last_name &&
// //         req.body.email &&
// //         req.body.phone_number &&
// //         req.body.gender) {
// //         const user_params: IUser = {
// //             name: {
// //                 first_name: req.body.name.first_name,
// //                 middle_name: req.body.name.middle_name,
// //                 last_name: req.body.name.last_name
// //             },
// //             email: req.body.email,
// //             phone_number: req.body.phone_number,
// //             gender: req.body.gender,
// //             modification_notes: [{
// //                 modified_on: new Date(Date.now()),
// //                 modified_by: null,
// //                 modification_note: 'New user created'
// //             }]
// //         };
// //         this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
// //             if (err) {
// //                 sqlError(err, res);
// //             } else {
// //                 successResponse('create user successfull', user_data, res);
// //             }
// //         });
// //     } else {
// //         // error response if some fields are missing in request body
// //         insufficientParameters(res);
// //     }
// // }
// // public get_user(req: Request, res: Response) {
// //     if (req.params.id) {
// //         const user_filter = { _id: req.params.id };
// //         this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
// //             if (err) {
// //                 sqlError(err, res);
// //             } else {
// //                 successResponse('get user successfull', user_data, res);
// //             }
// //         });
// //     } else {
// //         insufficientParameters(res);
// //     }
// // }
// // public update_user(req: Request, res: Response) {
// //     if (req.params.id &&
// //         req.body.name || req.body.name.first_name || req.body.name.middle_name || req.body.name.last_name ||
// //         req.body.email ||
// //         req.body.phone_number ||
// //         req.body.gender) {
// //         const user_filter = { _id: req.params.id };
// //         this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
// //             if (err) {
// //                 sqlError(err, res);
// //             } else if (user_data) {
// //                 user_data.modification_notes.push({
// //                     modified_on: new Date(Date.now()),
// //                     modified_by: null,
// //                     modification_note: 'User data updated'
// //                 });
// //                 const user_params: IUser = {
// //                     _id: req.params.id,
// //                     name: req.body.name ? {
// //                         first_name: req.body.name.first_name ? req.body.name.first_name : user_data.name.first_name,
// //                         middle_name: req.body.name.first_name ? req.body.name.middle_name : user_data.name.middle_name,
// //                         last_name: req.body.name.first_name ? req.body.name.last_name : user_data.name.last_name
// //                     } : user_data.name,
// //                     email: req.body.email ? req.body.email : user_data.email,
// //                     phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
// //                     gender: req.body.gender ? req.body.gender : user_data.gender,
// //                     is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
// //                     modification_notes: user_data.modification_notes
// //                 };
// //                 this.user_service.updateUser(user_params, (err: any) => {
// //                     if (err) {
// //                         sqlError(err, res);
// //                     } else {
// //                         successResponse('update user successfull', null, res);
// //                     }
// //                 });
// //             } else {
// //                 failureResponse('invalid user', null, res);
// //             }
// //         });
// //     } else {
// //         insufficientParameters(res);
// //     }
// // }
// //     public delete_user(req: Request, res: Response) {
// //         if (req.params.id) {
// //             this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
// //                 if (err) {
// //                     sqlError(err, res);
// //                 } else if (delete_details.deletedCount !== 0) {
// //                     successResponse('delete user successfull', null, res);
// //                 } else {
// //                     failureResponse('invalid user', null, res);
// //                 }
// //             });
// //         } else {
// //             insufficientParameters(res);
// //         }
// //     }
// // }
