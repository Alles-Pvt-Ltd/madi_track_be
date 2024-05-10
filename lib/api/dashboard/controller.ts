import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../../modules/common/service';
import Helper from './helper';
import {Service} from '../../database/mongodb/service'

export class DashboardController {

    // private helper: Helper = new Helper();
    private service: Service = new Service();

    public dashboardList = async (req:Request, res:Response) => {
        try {
            const { gsDivisionId } = req.params
            const response:any = {}

            const getFamilyCount = await this.service.getFamilyCount(req,res)
            if(!getFamilyCount.err)
            {
                response.familyCount = getFamilyCount.data
            }
            
            const getChildrensCount:any = await this.service.getChildrensCount(req,res)
            if(!getChildrensCount.err)
            {
                response.childrensCount = getChildrensCount.data
            }

            const getSeniorCitizensCount:any = await this.service.getSeniorCitizensCount(req, res)
            if(!getSeniorCitizensCount.err)
            {
                response.seniorCitizensCount = getSeniorCitizensCount.data
            }

            const getGovernmentEmployeesCount:any = await this.service.getGovernmentEmployeesCount(req,res)
            if(!getGovernmentEmployeesCount.err)
            {
                response.governmentEmployeesCount = getGovernmentEmployeesCount.data
            }

            const getUniversityStudentsCount:any = await this.service.getUniversityStudentsCount(req,res)
            if(!getUniversityStudentsCount.err)
            {
                response.universityStudentsCount  = getUniversityStudentsCount.data
            }
    
            if (Object.keys(response).length === 0) {
                return failureResponse("No data available for dashboard", null, res);
            }
            const responseData = Helper.dashboardResponse(response)
                // {
                // familyCount: getFamilyCount.data,
                // childrensCount: getChildrensCount.data,
                // seniorCitizensCount: getSeniorCitizensCount.data,
                // governmentEmployeesCount: getGovernmentEmployeesCount.data,
                // universityStudentsCount: getUniversityStudentsCount.data

            // });
            return successResponse('Dashboard Data Get Successfully',responseData,res)
        }
        catch(err) {
            return failureResponse('Error fetching dashboard data', err.message, res);
        }
        
    }
    
}

    