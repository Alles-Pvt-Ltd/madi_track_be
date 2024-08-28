"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema_1 = require("../../modules/gs_division/schema");
class Helper {
    countChildrens(gsDivisionId) {
        const result = schema_1.default.aggregate([
            {
                '$match': {
                    '_id': new mongoose_1.default.Types.ObjectId(gsDivisionId)
                }
            }, {
                '$unwind': '$family'
            }, {
                '$unwind': '$family.member'
            }, {
                '$addFields': {
                    'age': {
                        '$floor': {
                            '$divide': [
                                {
                                    '$subtract': [
                                        new Date(), '$family.member.dob'
                                    ]
                                }, 31536000000
                            ]
                        }
                    }
                }
            }, {
                '$match': {
                    'age': {
                        '$lt': 18
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'ChildrenCount': {
                        '$sum': 1
                    }
                }
            }
        ]);
        return result;
    }
    seniorCitizensCount(gsDivisionId) {
        const result = schema_1.default.aggregate([
            {
                '$match': {
                    '_id': new mongoose_1.default.Types.ObjectId(gsDivisionId)
                }
            }, {
                '$unwind': '$family'
            }, {
                '$unwind': '$family.member'
            }, {
                '$addFields': {
                    'age': {
                        '$floor': {
                            '$divide': [
                                {
                                    '$subtract': [
                                        new Date(), '$family.member.dob'
                                    ]
                                }, 31536000000
                            ]
                        }
                    }
                }
            }, {
                '$match': {
                    'age': {
                        '$gt': 60
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'SeniorCitizensCount': {
                        '$sum': 1
                    }
                }
            }
        ]);
        return result;
    }
    governmentEmployeesCount(gsDivisionId) {
        const result = schema_1.default.aggregate([
            {
                '$match': {
                    '_id': new mongoose_1.default.Types.ObjectId(gsDivisionId)
                }
            },
            {
                '$unwind': '$family'
            },
            {
                '$unwind': '$family.member'
            },
            {
                '$match': { 'family.member.is_GovernmentEmployee': true }
            },
            {
                '$group': {
                    '_id': '$_id',
                    'GovermentEmployeesCount': {
                        '$sum': 1
                    }
                }
            }
        ]);
        return result;
    }
}
exports.default = Helper;
