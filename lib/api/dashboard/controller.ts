import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../../modules/common/service';
import Helper from './helper';
import {Service} from '../../database/mongodb/service'

export class DashboardController {

    private helper: Helper = new Helper();
    private service: Service = new Service();

    public dashboardList = async (req:Request, res:Response) => {
        try {
            const { gsDivisionId } = req.params
            const getFamilyCount = await this.service.getFamilyCount(req,res)
            if(getFamilyCount.err)
            {
                return failureResponse("Families Count Not Found",null,res)
            }
            
            const getChildrensCount:any = await this.service.getChildrensCount(req,res)
            if(getFamilyCount.err)
            {
                return failureResponse("Childrens Count Not Found",null,res)
            }

            const getSeniorCitizensCount:any = await this.service.getSeniorCitizensCount(req, res)
            if(getFamilyCount.err)
            {
                return failureResponse("Families Count Not Found",null,res)
            }

            const getGovernmentEmployeesCount:any = await this.service.getGovernmentEmployeesCount(req,res)
            if(getFamilyCount.err)
            {
                return failureResponse("Families Count Not Found",null,res)
            }
    
            const responseData = {
                familycount: getFamilyCount.data,
                childrenscount: getChildrensCount.data,
                seniorcitizenscount: getSeniorCitizensCount.data,
                governmentemployeescount: getGovernmentEmployeesCount.data
            }
            return successResponse('Dashboard Data Get Successfully',responseData,res)
        }
        catch(err) {
            return failureResponse('Error fetching dashboard data', err.message, res);
        }
        
    }
    
}

    