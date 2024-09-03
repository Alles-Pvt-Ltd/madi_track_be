import { Request, Response } from "express";
import { Family } from "../../../database/mysql/family";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { validationResult } from "express-validator";
import Helper from "./helper";
import { Dashboard } from "../../../database/mysql/dashboard";
import { JwtToken } from "../../../core/jwt";
const { exec } = require('child_process');
export class DashboardController {
    public dashboardList = async (req: Request, res: Response) => {
        const gsDivisionId = parseInt(req.params.divisionId);
        try {
            const familiesCount = await Dashboard.getFamiliesCount(gsDivisionId);
            const childrenCount = await Dashboard.getChildrenCount(gsDivisionId); 
            const eldersCount = await Dashboard.getEldersCount(gsDivisionId);
            const governmentEmployeesCount = await Dashboard.getGovernmentEmployeesCount(gsDivisionId);
            const universityStudentsCount = await Dashboard.getUniversityStudentsCount(gsDivisionId);
    
            const response = {
                familyCount: familiesCount.data[0].totalFamilies,
                childrenCount: childrenCount.data[0].totalChildren,
                eldersCount: eldersCount.data[0].totalElders,
                governmentEmployeesCount: governmentEmployeesCount.data[0].totalGovernmentEmployees,
                universityStudentsCount: universityStudentsCount.data[0].totalUniversityStudents
            }
    
            return successResponse(Helper.dashboardResponse(response) , "Dashboard Data Got Successfully", res)
        }
        catch (error) {
            console.error("Error while getting data, Please try after some time");
        }
        
    }

    public deployment = async (req: Request, res: Response) => {
        exec('sh deploy.sh',
          (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);
              if (error !== null) {
                return failureResponse(error.message, res);
              }
              return successResponse({message:"Deployment done..."},"",res);
          });
      };
}