"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema_1 = require("../../modules/district/schema");
class Helper {
    FindGsDivisions(districtId) {
        const result = schema_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(districtId)
                }
            },
            {
                $lookup: {
                    from: "gs_divisions",
                    localField: "ds_divisions.gs_divisions_id",
                    foreignField: "_id",
                    as: "gs_divisions"
                }
            },
            {
                $unwind: "$gs_divisions"
            },
            {
                $project: {
                    "gs_divisions_id": "$gs_divisions._id",
                    "gs_divisions_name": "$gs_divisions.name",
                    "gs_id": "$gs_divisions.gs_id",
                    "family": "$gs_divisions.family"
                }
            }
        ]);
        return result;
    }
}
exports.default = Helper;
