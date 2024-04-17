import mongoose from "mongoose";
import { Request, Response } from 'express';
import GsDivision from '../../modules/gs_division/schema';

export default class Helper {
    public countChildrens (gsDivisionId:any) {
            const result = GsDivision.aggregate([
                {
                    '$match': {
                      '_id': new mongoose.Types.ObjectId(gsDivisionId)
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
            ])
        return result;
    }

    public seniorCitizensCount (gsDivisionId:any) {
        const result = GsDivision.aggregate([
            {
                '$match': {
                  '_id': new mongoose.Types.ObjectId(gsDivisionId)
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
        ])
    return result;
}

    public governmentEmployeesCount (gsDivisionId:any) {
        const result = GsDivision.aggregate([
            {
                '$match': {
                  '_id':new mongoose.Types.ObjectId(gsDivisionId)
                }
            }, 
            {
                '$unwind': '$family'
            },
            {
                '$unwind': '$family.member'
            },
			{
				'$match': {'family.member.is_GovernmentEmployee':true}
			},
			{
                '$group': {
                  '_id': '$_id', 
                  'GovermentEmployeesCount': {
                    '$sum': 1
                  }
                }
            }
        ])
        return result;
    }

    public universityStudentsCount (gsDivisionId:any) {
      const result = GsDivision.aggregate([
        { $match: { '_id': new mongoose.Types.ObjectId(gsDivisionId) } },
        {$unwind: '$family'},
        {$unwind: '$family.member'},
        { $match: { 'family.member.university': { $exists: true } } },
        { $group: { '_id': null, totalStudents: { $sum: 1 } } }
      ])
      return result;
    }
}