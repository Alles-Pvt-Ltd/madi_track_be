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
exports.UserController = void 0;
const service_1 = require("../../modules/common/service");
const service_2 = require("../../modules/gs_division/service");
// import DivisionModel from '../../modules/gs_division/schema';
class UserController {
    constructor() {
        this.user_service = new service_2.default();
        // public get_user(req: Request, res: Response) {
        //     if (req.params.id) {
        //         const user_filter = { _id: req.params.id };
        //         this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
        //             if (err) {
        //                 mongoError(err, res);
        //             } else {
        //                 successResponse('get user successfull', user_data, res);
        //             }
        //         });
        //     } else {
        //         insufficientParameters(res);
        //     }
        // }
        // public update_user(req: Request, res: Response) {
        //     if (req.params.id &&
        //         req.body.name || req.body.name.first_name || req.body.name.middle_name || req.body.name.last_name ||
        //         req.body.email ||
        //         req.body.phone_number ||
        //         req.body.gender) {
        //         const user_filter = { _id: req.params.id };
        //         this.user_service.filterUser(user_filter, (err: any, user_data: IUser) => {
        //             if (err) {
        //                 mongoError(err, res);
        //             } else if (user_data) {
        //                 user_data.modification_notes.push({
        //                     modified_on: new Date(Date.now()),
        //                     modified_by: null,
        //                     modification_note: 'User data updated'
        //                 });
        //                 const user_params: IUser = {
        //                     _id: req.params.id,
        //                     name: req.body.name ? {
        //                         first_name: req.body.name.first_name ? req.body.name.first_name : user_data.name.first_name,
        //                         middle_name: req.body.name.first_name ? req.body.name.middle_name : user_data.name.middle_name,
        //                         last_name: req.body.name.first_name ? req.body.name.last_name : user_data.name.last_name
        //                     } : user_data.name,
        //                     email: req.body.email ? req.body.email : user_data.email,
        //                     phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
        //                     gender: req.body.gender ? req.body.gender : user_data.gender,
        //                     is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
        //                     modification_notes: user_data.modification_notes
        //                 };
        //                 this.user_service.updateUser(user_params, (err: any) => {
        //                     if (err) {
        //                         mongoError(err, res);
        //                     } else {
        //                         successResponse('update user successfull', null, res);
        //                     }
        //                 });
        //             } else {
        //                 failureResponse('invalid user', null, res);
        //             }
        //         });
        //     } else {
        //         insufficientParameters(res);
        //     }
        // }
        // public delete_user(req: Request, res: Response) {
        //     if (req.params.id) {
        //         this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
        //             if (err) {
        //                 mongoError(err, res);
        //             } else if (delete_details.deletedCount !== 0) {
        //                 successResponse('delete user successfull', null, res);
        //             } else {
        //                 failureResponse('invalid user', null, res);
        //             }
        //         });
        //     } else {
        //         insufficientParameters(res);
        //     }
        // }
    }
    addDivision(req, res) {
        const user_params = {
            name: req.body.name,
            gs_id: req.body.gs_id,
            modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New Division created'
                }]
        };
        this.user_service.createUser(user_params, (err, user_data) => {
            if (err) {
                (0, service_1.mongoError)(err, res);
            }
            else {
                (0, service_1.successResponse)('create Division successfull', user_data, res);
            }
        });
    }
    getAllDivisions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user_service.filterDivisions({}, (err, division_data) => {
                if (err) {
                    return (0, service_1.failureResponse)("GS Divisions Not Found", null, res);
                }
                else {
                    const responseDatas = [];
                    division_data.forEach(item => {
                        const extractedItem = {
                            _id: item._id,
                            name: item.name
                        };
                        responseDatas.push(extractedItem);
                    });
                    (0, service_1.successResponse)('successfully get all divisions', responseDatas, res);
                }
            });
        });
    }
}
exports.UserController = UserController;
