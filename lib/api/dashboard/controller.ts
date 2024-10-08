import { Request, Response } from "express";
import { Family } from "../../database/mysql/family";
import { badResponse, failureResponse, successResponse } from "../../core/response";
import { validationResult } from "express-validator";
import Helper from "./helper";
import { Dashboard } from "../../database/mysql/dashboard";
import { JwtToken } from "../../core/jwt";
const { exec } = require('child_process');

export class DashboardController {
    public dashboardList = async (req: Request, res: Response) => {
       
        const gsDivisionId = parseInt(req.params.divisionId);
        try {
            
            const dashboardCountData = await Dashboard.getDashboardData(gsDivisionId);
            const response = {
                familyCount: dashboardCountData.data[0][0].totalFamilies,
                childrenCount: dashboardCountData.data[1][0].totalChildren,
                eldersCount: dashboardCountData.data[2][0].totalElders,
                governmentEmployeesCount: dashboardCountData.data[3][0].totalGovernmentEmployees,
                universityStudentsCount: dashboardCountData.data[4][0].totalUniversityStudents,
                disabledPersonsCount: dashboardCountData.data[5][0].totalDisabledPersons,
                totalMember: dashboardCountData.data[6][0].totalMember,
                totalMale: dashboardCountData.data[7][0].totalMale,
                totalFemale: dashboardCountData.data[8][0].totalFemale,
            }
    
            return successResponse(Helper.dashboardResponse(response) , "Dashboard Data Got Successfully", res)
        }
        catch (error) {
            console.error("Error while getting data, Please try after some time");
        }

    }

    public dashboardInfo = (req: Request, res: Response) => {
        Dashboard.getDashboardInfo()
            .then(({ err, data }) => {
                if (err) return failureResponse("Error retrieving dashboard info", res);
    
                const [gsDivisionData, maleGenderData, femaleGenderData, employmentData] = data;
                const maleCount = maleGenderData?.[0]?.totalChildren || 0;
                const femaleCount = femaleGenderData?.[0]?.totalElders || 0;
    
                let governmentEmployeesCount = 0;
                let nonGovernmentEmployeesCount = 0;
    
                console.log("Employment Data:", employmentData);
    
                if (employmentData && Array.isArray(employmentData)) {
                    const governmentEmployeeData = employmentData.find(
                        (item) => item.totalGovernmentEmployees !== undefined
                    );
                    governmentEmployeesCount = governmentEmployeeData?.totalGovernmentEmployees || 0;
    
                                   const nonGovernmentEmployeeData = employmentData.find(
                        (item) => item.totalNonGovernmentEmployees !== undefined
                    );
                    nonGovernmentEmployeesCount = nonGovernmentEmployeeData?.totalNonGovernmentEmployees || 0;
                }
    
                const genderCount = { male: maleCount, female: femaleCount };
    
                Dashboard.getDashboardInfo()
                    .then((webDashboardData) => {
                        if (webDashboardData.err) return failureResponse("Error retrieving web dashboard data", res);
    
                        const webDashboardResponse = Helper.webDashboardResponse({
                            ...webDashboardData.data,
                            governmentEmployeesCount,
                            nonGovernmentEmployeesCount,
                            totalMale: maleCount,
                            totalFemale: femaleCount
                        });
    
                        return successResponse({
                            gsDivisionData,
                            genderCount,
                            governmentEmployeesCount,
                            nonGovernmentEmployeesCount,
                            webDashboardResponse
                        }, "Dashboard Info Retrieved Successfully", res);
                    })
                    .catch(() => failureResponse("Error retrieving web dashboard data", res));
            })
            .catch(() => failureResponse("Error retrieving dashboard info", res));
    };
    
   
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