import Helper from "./helper";
import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../../modules/common/service';
import GsDivisionSchema from '../../modules/gs_division/schema';

export class Service {
    private helper:Helper = new Helper();

    public async getFamilyCount(req:Request, res:Response) {
        try {
            const {gsDivisionId} = req.params;
            const data = await GsDivisionSchema.findOne({ _id: gsDivisionId });
            const families = data.family;
            const counts = families.length;
            return { err:false,data:counts };       
        }
        catch(err){
            return { err:true, data:err.message };
        }
        
    }

    public async getChildrensCount(req:Request, res:Response) {
        const {gsDivisionId} = req.params;
        try {
            const count = await this.helper.countChildrens(gsDivisionId);
            if(count.length == 0)
            {
                return { err:true,data:"No Childrens" }
            }
            return { err:false,data:count[0].ChildrenCount };
        }
        catch(err){
            return { err:true, data:err.message };
        }
    }

    public async getSeniorCitizensCount(req:Request, res:Response) {
        const {gsDivisionId} = req.params;
        try {
            const count = await this.helper.seniorCitizensCount(gsDivisionId);
            if(count.length == 0)
            {
                return { err:true,data:"No Senior Citizens" }
            }
            return { err:false,data:count[0].SeniorCitizensCount }
        }
        catch(err){
            return { err:true, data:err.message }
        }
    }

    public async getGovernmentEmployeesCount(req:Request, res:Response) {
        
        const {gsDivisionId} = req.params;
        try {
            const count = await this.helper.governmentEmployeesCount(gsDivisionId);
            if(count.length == 0)
            {
                return { err:true,data:"No Government Employees" }
            }
            return { err: false,data:count[0].GovermentEmployeesCount };
        }
        catch(err){
            return { err:true, data:err.message }
        }
    }

    public async getUniversityStudentsCount(req:Request, res:Response) {
        
        const {gsDivisionId} = req.params;
        try {
            const count = await this.helper.universityStudentsCount(gsDivisionId);
            if(count.length == 0)
            {
                return { err:true,data:"No University Students" }
            }
            return { err: false,data:count[0].totalStudents };
        }
        catch(err){
            return { err:true, data:err.message }
        }
    }
}