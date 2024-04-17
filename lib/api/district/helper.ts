import mongoose from "mongoose";
import { Request, Response } from 'express';
import District from '../../modules/district/schema';

export default class Helper {
    public FindGsDivisions (districtId:any) {
        
            const result = District.aggregate([
                {
                    $match: {
                      _id: new mongoose.Types.ObjectId(districtId)
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
               ])
               return result;
    }
}