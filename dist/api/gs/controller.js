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
const schema_2 = require("../../modules/gs/schema");
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
class UserController {
    constructor() {
        this.userService = new service_2.default();
        this.familyService = new service_3.default();
        this.stringConstant = new constant_1.StringConstant();
        this.addHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { divisionId, familyId } = req.params;
            const history = req.body;
            try {
                const gsDivision = yield schema_1.default.findOne({ _id: divisionId });
                if (!gsDivision) {
                    return (0, service_1.DatanotFound)('GS division not found', req, res);
                }
                const foundFamily = gsDivision.family.find((family) => family._id == familyId);
                if (!foundFamily) {
                    return (0, service_1.DatanotFound)('Family not found', req, res);
                }
                foundFamily.history.push(history);
                const savedData = yield gsDivision.save();
                if (!savedData) {
                    return (0, service_1.failureResponse)("History not added!!!", null, res);
                }
                const historyLength = foundFamily.history.length;
                const responseHistory = foundFamily.history[historyLength - 1];
                const finalResponse = {
                    date: new Date(responseHistory.date).toISOString().split('T')[0],
                    description: responseHistory.description,
                    organization: responseHistory.organization,
                    id: responseHistory._id
                };
                return (0, service_1.successResponse)("History Added Successfully", finalResponse, res);
            }
            catch (error) {
                return (0, service_1.failureResponse)('An Error occur while adding histroy', divisionId, res);
            }
        });
        // List all histories of a family
        this.getHistories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { divisionId, familyId } = req.params;
            try {
                const gsDivision = yield schema_1.default.findOne({ _id: divisionId });
                if (!gsDivision) {
                    return (0, service_1.DatanotFound)('GS division not found', req, res);
                }
                const foundFamily = gsDivision.family.find((family) => family._id == familyId);
                if (!foundFamily) {
                    return (0, service_1.DatanotFound)('Family not found', req, res);
                }
                const historyDatas = foundFamily.history;
                if (historyDatas.length == 0) {
                    return (0, service_1.DatanotFound)('No history for this family', null, res);
                }
                const finalResponse = historyDatas.map((item) => ({
                    date: new Date(item.date).toISOString().split('T')[0],
                    description: item.description,
                    organization: item.organization,
                    id: item._id
                }));
                return (0, service_1.successResponse)("Histories Retrived Successfully", finalResponse, res);
            }
            catch (err) {
                console.log(err);
                return (0, service_1.failureResponse)("An Error occured while get histories", null, res);
            }
        });
    }
    userRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
            // if we have validation error
            if (validation[0]) {
                return (0, service_1.validationError)(validation[0].msg, req.body, res);
            }
            const user_params = {
                name: req.body.name,
                email: req.body.email,
                password: app_function_1.AppFucntion.encryptPassword(req.body.password),
                phone: req.body.phone,
                gs_division_id: req.body.gsDivisionId,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New user created'
                    }]
            };
            this.userService.createUser(user_params, (err, user_data) => {
                if (err) {
                    if (err.code === 11000 && err.keyPattern && err.keyValue.email) //this line is check email is already created or not
                     {
                        return (0, service_1.forbidden)('Email is Already registered', user_data, res);
                    }
                    else {
                        return (0, service_1.validationError)("Can't register because You missed some data fields", null, res);
                    }
                }
                else {
                    const responseData = {
                        id: user_data._id,
                        name: user_data.name,
                        email: user_data.email,
                        phone: user_data.phone,
                        gsDivisionId: user_data.gs_division_id,
                        modificationNotes: user_data.modification_notes
                    };
                    return (0, service_1.successResponse)('create user successfull', responseData, res);
                }
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = yield (0, express_validator_1.validationResult)(req).array(); //here we validate user request before create post
                // if we have validation error
                if (validation[0]) {
                    return (0, service_1.validationError)(validation[0].msg, null, res);
                }
                const { email, password } = req.body;
                this.userService.filterUser({ email }, (err, sys_da) => {
                    if (err) {
                        return (0, service_1.commenError)("You provided wrong credentials", null, res);
                    }
                    else if (!sys_da) {
                        return (0, service_1.forbidden)(this.stringConstant.emailPasswordMismatch, null, res);
                    }
                    else {
                        const comparePassword = app_function_1.AppFucntion.passwordVerify(password, sys_da.password);
                        if (!comparePassword) {
                            return (0, service_1.forbidden)(this.stringConstant.emailPasswordMismatch, null, res);
                        }
                        const token = app_function_1.AppFucntion.createJwtToken(sys_da._id);
                        if (token) {
                            const responseData = {
                                id: sys_da._id,
                                name: sys_da.name,
                                email: sys_da.email,
                                phone: sys_da.phone,
                                gsDivisionId: sys_da.gs_division_id,
                                modificationNotes: sys_da.modification_notes,
                                token: token
                            };
                            return (0, service_1.successResponse)("login successfull", responseData, res);
                        }
                    }
                });
            }
            catch (err) {
                return (0, service_1.serverError)("Server Error!!! Please Contact Admin", null, res);
            }
        });
    }
    addFamily(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { divisionId } = req.params;
            try {
                const gsDivision = yield schema_1.default.findById({ _id: divisionId });
                if (!gsDivision) {
                    return service_1.notFound;
                }
                else {
                    let flag = false;
                    gsDivision.family.forEach(item => {
                        if (item.phone == req.body.phone) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        return (0, service_1.failureResponse)('Family is Already registered', null, res);
                    }
                    else {
                        const parsedLat = parseFloat(req.body.lat);
                        const parsedLon = parseFloat(req.body.lon);
                        const inputData = {
                            name: req.body.name,
                            address: req.body.address,
                            phone: req.body.phone,
                            lat: parsedLat,
                            lon: parsedLon,
                            geoLocation: {
                                type: 'Point',
                                coordinates: [parsedLon, parsedLat]
                            }
                        };
                        gsDivision.family.push(inputData);
                        yield gsDivision.save();
                        const response = gsDivision.family.find(fam => fam.name == req.body.name && fam.phone == req.body.phone);
                        const finalResponse = {
                            name: response.name,
                            address: response.address,
                            phone: response.phone,
                            lat: response.lat,
                            lon: response.lon,
                            geoLocation: response.geoLocation,
                            id: response._id
                        };
                        return (0, service_1.successResponse)('Family added successfully', finalResponse, res);
                    }
                }
            }
            catch (error) {
                return (0, service_1.failureResponse)('Error adding family please contact admin', error, res);
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
                            return (0, service_1.DatanotFound)('Family not found', req, res);
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
                // Update the lat
                if (updatedFamilyData.lat)
                    foundFamily.lat = updatedFamilyData.lat;
                //Update the lon
                if (updatedFamilyData.lon)
                    foundFamily.lon = updatedFamilyData.lon;
                if (updatedFamilyData.lat && updatedFamilyData.lon)
                    foundFamily.geoLocation = { type: 'Point', coordinates: [updatedFamilyData.lon, updatedFamilyData.lat] };
                const datas = yield gsDivision.save();
                const response = datas.family;
                const family = response.find(fam => fam._id == familyId);
                const finalResponse = ({
                    name: family.name,
                    address: family.address,
                    phone: family.phone,
                    lat: family.lat,
                    lon: family.lon,
                    geoLocation: family.geoLocation,
                    id: family._id,
                    history: family.history
                });
                return (0, service_1.successResponse)('Family details updated successfully', finalResponse, res);
            }
            catch (error) {
                return (0, service_1.failureResponse)('Internal Server Error', error, res);
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
                    let flag = false;
                    foundFamily.member.forEach(item => {
                        if (item.nic_no == req.body.nic_no) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        return (0, service_1.forbidden)('Member is Already registered', null, res);
                    }
                    else {
                        foundFamily.member.push(req.body);
                        yield gsDivision.save();
                        const response = foundFamily.member.find(mem => mem.name == req.body.name);
                        const finalResponse = {
                            name: response.name,
                            gender: response.gender,
                            role: response.role,
                            dateOfBirth: new Date(response.dob).toISOString().split('T')[0],
                            nicNo: response.nic_no,
                            occupation: response.occupation,
                            isGovernmemtEmployee: response.is_GovernmentEmployee,
                            id: response._id
                        };
                        return (0, service_1.successResponse)('Member added successfully', finalResponse, res);
                    }
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
                    const deleteFamily = foundFamily.member[memberIndex];
                    foundFamily.member.splice(memberIndex, 1);
                    gsDivision.save((err, updatedFamily) => {
                        if (err) {
                            return (0, service_1.failureResponse)('Failed to delete a member', foundFamily.member, res);
                        }
                        const members = foundFamily.member;
                        const responseData = ({
                            name: deleteFamily.name,
                            gender: deleteFamily.gender,
                            role: deleteFamily.role,
                            dateOfBirth: new Date(deleteFamily.dob).toISOString().split('T')[0],
                            nicNo: deleteFamily.nic_no,
                            occupation: deleteFamily.occupation,
                            isGovernmentEmployee: deleteFamily.is_GovernmentEmployee,
                            id: deleteFamily._id
                        });
                        return (0, service_1.successResponse)('Member Deleted Successfully', responseData, res);
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
                '_id': memberId,
                'name': req.body.name ? req.body.name : updatedMember.name,
                'gender': req.body.gender ? req.body.gender : updatedMember.gender,
                'dob': req.body.dob ? req.body.dob : updatedMember.dob,
                'role': req.body.role ? req.body.role : updatedMember.role,
                'nic_no': req.body.nicNo ? req.body.nicNo : updatedMember.nic_no,
                'occupation': req.body.occupation ? req.body.occupation : updatedMember.occupation,
                'is_GovernmentEmployee': req.body.isGovernmentEmployee ? req.body.isGovernmentEmployee : updatedMember.is_GovernmentEmployee
            };
            foundFamily.member.splice(memberIndex, 1, member_params);
            gsDivision.save((err, division) => {
                if (err) {
                    return (0, service_1.failureResponse)('Failed to update a member', foundFamily.member, res);
                }
                const members = foundFamily.member;
                const response = members.find((mem) => mem._id == memberId);
                const finalResponse = ({
                    name: response.name,
                    gender: response.gender,
                    role: response.role,
                    dateOfBirth: new Date(response.dob).toISOString().split('T')[0],
                    nicNo: response.nic_no,
                    occupation: response.occupation,
                    isGovernmentEmployee: response.is_GovernmentEmployee,
                    id: response._id
                });
                return (0, service_1.successResponse)('Member Updated Successfully', finalResponse, res);
            });
        });
    }
    updateGsProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsId } = req.params;
            const { name, email, password } = req.body;
            try {
                const gs = yield schema_2.default.findById(gsId);
                if (!gs) {
                    return (0, service_1.DatanotFound)('GS not found', req, res);
                }
                else {
                    if (name)
                        gs.name = name;
                    if (email)
                        gs.email = email;
                    if (password)
                        gs.password = app_function_1.AppFucntion.encryptPassword(password);
                    const data = yield gs.save();
                    if (!data) {
                        return (0, service_1.failureResponse)("Data Not Updated", null, res);
                    }
                    const responseData = {
                        _id: gs._id,
                        name: gs.name,
                        email: gs.email
                    };
                    return (0, service_1.successResponse)("GS Profile Updated Successfully", responseData, res);
                }
            }
            catch (err) {
                return (0, service_1.failureResponse)('Error Updating GS Profile', err.message, res);
            }
        });
    }
    listAllFamilies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsId } = req.body;
            try {
                const families = yield schema_2.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(gsId)
                        }
                    },
                    {
                        $lookup: {
                            from: "gs_divisions",
                            localField: "gs_division_id",
                            foreignField: "_id",
                            as: "gsdivisions"
                        }
                    },
                    { $unwind: '$gsdivisions' },
                    { $unwind: '$gsdivisions.family' },
                    {
                        $project: {
                            "_id": 0,
                            "gsdivisions": 1
                        }
                    },
                ]);
                if (families.length == 0) {
                    return (0, service_1.failureResponse)("No Families Found", "No Families", res);
                }
                const modifiedResponse = families.map(item => ({
                    name: item.gsdivisions.family.name,
                    address: item.gsdivisions.family.address,
                    phone: item.gsdivisions.family.phone,
                    lat: item.gsdivisions.family.lat,
                    lon: item.gsdivisions.family.lon,
                    geoLocation: item.gsdivisions.family.geoLocation,
                    id: item.gsdivisions.family._id,
                    members: item.gsdivisions.family.member,
                    history: item.gsdivisions.family.history,
                    totalMembers: item.gsdivisions.family.member.length
                }));
                return (0, service_1.successResponse)("Get families Successfully", modifiedResponse, res);
            }
            catch (err) {
                return (0, service_1.serverError)(err.message, null, res);
            }
        });
    }
    listAllMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gsId = req.body.gsId;
            const familyId = req.body.familyId;
            try {
                const familiesList = yield schema_2.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(gsId)
                        }
                    },
                    {
                        $lookup: {
                            from: "gs_divisions",
                            localField: "gs_division_id",
                            foreignField: "_id",
                            as: "gsdivisions"
                        }
                    },
                    { $unwind: '$gsdivisions' },
                    { $unwind: '$gsdivisions.family' },
                    {
                        $match: {
                            "gsdivisions.family._id": new mongoose_1.default.Types.ObjectId(familyId)
                        }
                    },
                    {
                        $project: {
                            "_id": 0,
                            "gsdivisions": 1
                        }
                    },
                ]);
                const membersList = familiesList.reduce((acc, item) => {
                    const members = item.gsdivisions.family.member.map(mem => ({
                        name: mem.name,
                        gender: mem.gender,
                        dateOfBirth: new Date(mem.dob).toISOString().split('T')[0],
                        role: mem.role,
                        nicNo: mem.nic_no,
                        occupation: mem.occupation,
                        id: mem._id
                    }));
                    return acc.concat(members);
                }, []);
                return (0, service_1.successResponse)("Get Members Successfully", membersList, res);
            }
            catch (err) {
                return (0, service_1.serverError)(err.message, null, res);
            }
        });
    }
}
exports.UserController = UserController;
