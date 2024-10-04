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


    public webDashboardList = (req: Request, res: Response) => {
        
        //Dashboard.getWebDashboardData(dsDivisionId).then(dashboardCountData => {
            Dashboard.getWebDashboardData().then(dashboardCountData => {

            console.log(dashboardCountData);
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
        }).catch(error => {
            return failureResponse("Error while getting data, please try after some time", res);
        });
    }
    
    public dashboardInfo = (req: Request, res: Response) => {
        // const divisionId = Number(req.query.divisionId);
    
        // if (!divisionId) {
        //     return failureResponse("Invalid divisionId provided", res);
        // }
    
        Dashboard.getDashboardInfo()
            .then(dashboardData => {
                if (dashboardData.err) {
                    return failureResponse("Error retrieving dashboard info", res);
                }
    
                const [gsDivisionData, maleGenderData, femaleGenderCount] = dashboardData.data;
    
                console.log(gsDivisionData);
                console.log(maleGenderData);
                console.log(femaleGenderCount);

                const maleData = maleGenderData.find(item => item.gender === 3) || { COUNT: 0 };
                const femaleData = femaleGenderCount.find(item => item.gender === 4) || { COUNT: 0 };
    
                const genderCount = { male: maleData.COUNT, female: femaleData.COUNT };
    
                const response = Helper.graphDashboardResponse(gsDivisionData, genderCount, null);
                return successResponse(response, "Dashboard Info Retrieved Successfully", res);
            })
            .catch(error => {
                return failureResponse("Error while retrieving dashboard info", res);
            });
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