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
const service_2 = require("../../modules/gs/service");
const service_3 = require("../../modules/gs_division/service");
const constant_1 = require("../../config/constant");
const app_function_1 = require("../../app/app_function");
const schema_1 = require("../../modules/gs_division/schema");
const express_validator_1 = require("express-validator");
class UserController {
    constructor() {
        this.userService = new service_2.default();
        this.familyService = new service_3.default();
        this.stringConstant = new constant_1.StringConstant();
    }
    userRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            // this check whether all the filds were send through the request or not
            // if (req.body.name && req.body.email &&
            //     req.body.password && req.body.gs_division_id) {
            const user_params = {
                name: req.body.name,
                email: req.body.email,
                password: app_function_1.AppFucntion.encryptPassword(req.body.password),
                gs_division_id: req.body.gs_division_id,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New user created'
                    }]
            };
            this.userService.createUser(user_params, (err, user_data) => {
                if (err) {
                    if (err.code === 11000 && err.keyPattern && err.keyValue.email) {
                        return (0, service_1.forbidden)('Email is Already registered', user_data, res);
                    }
                    else {
                        return (0, service_1.mongoError)(err, res);
                    }
                }
                else {
                    const responseData = {
                        name: user_data.name,
                        email: user_data.email,
                        gs_division_id: user_data.gs_division_id,
                        modification_notes: user_data.modification_notes
                    };
                    return (0, service_1.successResponse)('create user successfull', responseData, res);
                }
            });
            // } else {
            //     // error response if some fields are missing in request body
            //     insufficientParameters("Some input fields are missing",res);
            // }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const { email, password } = req.body;
            // if(validateField)
            // {
            this.userService.filterUser({ email }, (err, sys_da) => {
                if (err) {
                    return err;
                }
                else {
                    if (!sys_da) {
                        return (0, service_1.notFound)(sys_da, res);
                    }
                    const comparePassword = app_function_1.AppFucntion.passwordVerify(password, sys_da.password);
                    if (!comparePassword) {
                        return (0, service_1.forbidden)(this.stringConstant.passwordMissMatch, null, res);
                    }
                    const token = app_function_1.AppFucntion.createJwtToken(sys_da._id, sys_da.name);
                    if (token) {
                        const responseData = {
                            _id: sys_da._id,
                            name: sys_da.name,
                            email: sys_da.email,
                            gs_division_id: sys_da.gs_division_id,
                            modification_notes: sys_da.modification_notes
                        };
                        return (0, service_1.successResponse)("login successfull", responseData, res);
                    }
                }
            });
            // }
        });
    }
    addFamily(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { divisionId } = req.params;
            try {
                const gsDivision = yield schema_1.default.findById(divisionId);
                if (!gsDivision) {
                    return service_1.notFound;
                }
                gsDivision.family.push(req.body);
                yield gsDivision.save();
                return (0, service_1.successResponse)('Family and Members added successfully', gsDivision, res);
            }
            catch (error) {
                return (0, service_1.failureResponse)('Error adding Family and member', divisionId, res);
            }
        });
    }
    get_family(req, res) {
        if (req.params.divisionId) {
            const user_filter = { _id: req.params.divisionId };
            this.familyService.filterUser(user_filter, (err, division_data) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else if (!division_data) {
                    // No division found with the given ID
                    return (0, service_1.DatanotFound)('Division Not Found', req, res);
                }
                else if (!division_data.family || division_data.family.length === 0) {
                    // Division found but no families or no matching family found
                    return (0, service_1.DatanotFound)('Family not found in the division', req, res);
                }
                else {
                    const foundFamily = division_data.family.find((family) => family._id == req.params.familyId);
                    if (!foundFamily) {
                        return (0, service_1.DatanotFound)('Family Not Found', req, res);
                    }
                    else {
                        (0, service_1.successResponse)('get family successfull', foundFamily, res);
                    }
                }
            });
        }
        else {
            (0, service_1.insufficientParameters)("id field is missing", res);
        }
    }
    // Search family by name
    searchFamily(req, res) {
        if (req.params.divisionId) {
            const user_filter = { _id: req.params.divisionId };
            this.familyService.filterUser(user_filter, (err, division_data) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else if (!division_data) {
                    // No division found with the given ID
                    return (0, service_1.DatanotFound)('Division Not Found', req, res);
                }
                else if (!division_data.family || division_data.family.length === 0) {
                    // Division found but no families or no matching family found
                    return (0, service_1.DatanotFound)('Family not found in the division', req, res);
                }
                else {
                    if (req.query.name) {
                        const foundFamily = division_data.family.find((family) => family.name.toLowerCase() == req.query.name);
                        if (!foundFamily) {
                            return res.status(404).json({ message: 'Family not found' });
                        }
                        else {
                            return (0, service_1.successResponse)('get family successfull', foundFamily, res);
                        }
                    }
                }
            });
        }
        else {
            (0, service_1.insufficientParameters)("id field missing", res);
        }
    }
    // Update family details API endpoint
    update_Family(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gsDivisionId, familyId } = req.params;
                const updatedFamilyData = req.body;
                const gsDivision = yield schema_1.default.findById(gsDivisionId);
                if (!gsDivision) {
                    return (0, service_1.DatanotFound)('GS Division not found', req, res);
                }
                const foundFamily = gsDivision.family.find((family) => family._id == req.params.familyId);
                if (!foundFamily) {
                    return (0, service_1.DatanotFound)('Family not found', req, res);
                }
                // Update each field in the family object
                if (updatedFamilyData.name)
                    foundFamily.name = updatedFamilyData.name;
                if (updatedFamilyData.address)
                    foundFamily.address = updatedFamilyData.address;
                if (updatedFamilyData.phone)
                    foundFamily.phone = updatedFamilyData.phone;
                // Update the member array if provided
                if (updatedFamilyData.member)
                    foundFamily.member = updatedFamilyData.member;
                // Update the history array if provided
                if (updatedFamilyData.history)
                    foundFamily.history = updatedFamilyData.history;
                const datas = yield gsDivision.save();
                return (0, service_1.successResponse)('Family details updated successfully', datas, res);
            }
            catch (error) {
                return (0, service_1.forbidden)('Internal Server Error', req, res);
            }
        });
    }
    delete_family(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { divisionId, familyId } = req.params;
            if (divisionId) {
                const user_filter = { _id: divisionId };
                this.familyService.filterUser(user_filter, (err, division_data) => {
                    if (err) {
                        (0, service_1.mongoError)(err, res);
                    }
                    else if (!division_data) {
                        // No division found with the given ID
                        return (0, service_1.DatanotFound)('GS Division not found', req, res);
                    }
                    else if (!division_data.family || division_data.family.length === 0) {
                        // Division found but no families or no matching family found
                        return (0, service_1.DatanotFound)('Family not found in the division', req, res);
                    }
                    else {
                        const foundFamily = division_data.family.find((family) => family._id == familyId);
                        if (!foundFamily) {
                            return (0, service_1.DatanotFound)('Family not found', req, res);
                        }
                        else {
                            schema_1.default.findByIdAndUpdate(divisionId, { $pull: { family: { _id: familyId } } }, (err, updatedDivision) => __awaiter(this, void 0, void 0, function* () {
                                if (err) {
                                    (0, service_1.mongoError)(err, res);
                                }
                                else if (!updatedDivision) {
                                    return (0, service_1.DatanotFound)('GS Division not found', req, res);
                                }
                                else {
                                    const gsDivision = yield schema_1.default.findById(divisionId);
                                    return (0, service_1.successResponse)('Family deleted successfully', gsDivision.family, res);
                                }
                            }));
                        }
                    }
                    ;
                });
            }
            else {
                (0, service_1.insufficientParameters)("id field missing", res);
            }
        });
    }
    addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { divisionId, familyId } = req.params;
            try {
                const gsDivision = yield schema_1.default.findOne({ _id: divisionId });
                if (!gsDivision) {
                    return service_1.notFound;
                }
                const foundFamily = gsDivision.family.find((family) => family._id == familyId);
                if (!foundFamily) {
                    return (0, service_1.DatanotFound)('Family not found', req, res);
                }
                else {
                    foundFamily.member.push(req.body);
                    yield gsDivision.save();
                    return (0, service_1.successResponse)('Member added successfully', foundFamily.member, res);
                }
            }
            catch (error) {
                return (0, service_1.failureResponse)('Error adding member', divisionId, res);
            }
        });
    }
    deleteMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { divisionId, familyId, memberId } = req.params;
            try {
                const gsDivision = yield schema_1.default.findOne({ _id: divisionId });
                if (!gsDivision) {
                    return service_1.notFound;
                }
                const foundFamily = gsDivision.family.find((family) => family._id == familyId);
                if (!foundFamily) {
                    return (0, service_1.DatanotFound)('Family not found', req, res);
                }
                else {
                    const memberIndex = foundFamily.member.findIndex((member) => member._id == memberId);
                    if (memberIndex === -1) {
                        return res.status(404).json({ error: 'Member not found in the family' });
                    }
                    foundFamily.member.splice(memberIndex, 1);
                    gsDivision.save((err, updatedFamily) => {
                        if (err) {
                            return (0, service_1.failureResponse)('Failed to delete a member', foundFamily.member, res);
                        }
                        const members = foundFamily.member;
                        return (0, service_1.successResponse)('Member Deleted Successfully', members, res);
                    });
                }
            }
            catch (error) {
                return (0, service_1.failureResponse)('Error adding member', divisionId, res);
            }
        });
    }
    updateMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsDivisionId, familyId, memberId } = req.params;
            const gsDivision = yield schema_1.default.findById(gsDivisionId);
            if (!gsDivision) {
                return (0, service_1.DatanotFound)('GS Division not found', req, res);
            }
            const foundFamily = gsDivision.family.find((family) => family._id == req.params.familyId);
            if (!foundFamily) {
                return (0, service_1.DatanotFound)('Family not found', req, res);
            }
            const memberIndex = foundFamily.member.findIndex((member) => member._id == memberId);
            if (memberIndex === -1) {
                return (0, service_1.DatanotFound)('Member not found in the family', req, res);
            }
            const updatedMember = foundFamily.member[memberIndex];
            const member_params = {
                // _id: req.params.id,
                'name': req.body.name ? req.body.name : updatedMember.name,
                'gender': req.body.gender ? req.body.gender : updatedMember.gender,
                'dob': req.body.dob ? req.body.dob : updatedMember.dob,
                'role': req.body.role ? req.body.role : updatedMember.role,
                'nic_no': req.body.nic_no ? req.body.nic_no : updatedMember.nic_no,
                'occupation': req.body.occupation ? req.body.occupation : updatedMember.occupation,
            };
            foundFamily.member.splice(memberIndex, 1, member_params);
            gsDivision.save((err, division) => {
                if (err) {
                    return (0, service_1.failureResponse)('Failed to update a member', foundFamily.member, res);
                }
                const members = foundFamily.member;
                return (0, service_1.successResponse)('Member Updated Successfully', members, res);
            });
        });
    }
}
exports.UserController = UserController;
