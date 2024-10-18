import { Request, Response } from "express";
import { badResponse, failureResponse, successResponse } from "../../core/response";
import userHelper from "../user/helper";
import { validationResult } from "express-validator";
import { Admin } from "../../database/mysql/admin";
import { JwtToken } from "../../core/jwt";
import { User } from "../../database/mysql/user"
import { log } from "console";

export class AdminController {
    public getAllGsList = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        var userData = User.getUserByCode(jwtData.code);
        
        if(!(await userData).data[0])
        {
            return failureResponse("Please provide valid token", res);
        }
        const gsList = await Admin.getAllGsList((await userData).data[0].gsDivisionId);
        if(gsList.err)
        {
            return failureResponse(gsList.message, res);
        }

        return successResponse(gsList.data, gsList.message, res);
    }

    public deleteGs = (req: Request, res: Response) => {
        const gsId = parseInt(req.params.gsId);

        if (isNaN(gsId)) {
            return failureResponse("Invalid gs id parameter. Please provide a valid.", res);
        }

        Admin.deleteGS(gsId)
            .then(membersList => {
                if (membersList.err) {
                    console.error("Error while retrieving members list:", membersList.message);
                    return failureResponse(membersList.message, res);
                }
                return successResponse(membersList.data, membersList.message, res);
            })
            .catch(error => {
                console.error("Unexpected error:", error);
                return failureResponse("An unexpected error occurred", res);
            });
    }

    public getAllFamilies = async (req: Request, res: Response) => {
        const familyList = await Admin.getAllFamilies(req.body.divisionId);
        if(familyList.err)
        {
            return failureResponse(familyList.message, res);
        }

        return successResponse(familyList.data, familyList.message, res);
    }

    public getAllFamilyTransfers = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        const userInfo = await User.getUserByCode(jwtData.code);
      
        if (userInfo.err || userInfo.data.length < 1) {
            return failureResponse(userInfo.message ? userInfo.message : "Cannot find user. Please login again", res);
        }

        const userDetail = await User.userInfo(userInfo.data[0].id);
        if(userDetail.err)
        {
            return failureResponse("Error Occur, UserDetails Not Found", res)
        }
        var userInfoData = userHelper.userResponse(userDetail.data);
        
        var transferList;
        if(userInfoData.role == 1){
            var defaultDivisionId = userInfoData.divisionIds.find(d => d.isDefault == 1).id;
            transferList = await Admin.getAllFamilyTransfers(defaultDivisionId);
        }
        else {            
            transferList = await Admin.getAllFamilyTransfers(0);
        }
        if(transferList.err)
        {
            return failureResponse(transferList.message, res);
        }

        return successResponse(transferList.data, transferList.message, res);
    } 
    

    public getMembersByFamilyId = (req: Request, res: Response) => {
        const familyId = parseInt(req.params.familyId);

        if (isNaN(familyId)) {
            return failureResponse("Invalid familyId parameter. Please provide a valid family ID.", res);
        }

        Admin.getMembersByFamilyId(familyId)
            .then(membersList => {
                if (membersList.err) {
                    console.error("Error while retrieving members list:", membersList.message);
                    return failureResponse(membersList.message, res);
                }
                return successResponse(membersList.data, membersList.message, res);
            })
            .catch(error => {
                console.error("Unexpected error during members retrieval:", error);
                return failureResponse("An unexpected error occurred during members retrieval.", res);
            });
    }

    public generateReport = async (req: Request, res: Response) => {
        try {
            const reportData = await Admin.generateReport(req.body);
            if(reportData.err)
            {
                throw Error (reportData.message);
            }
            //console.log(req.body.gsDivisionId);
            var response = {
                families : reportData.data[0],
                additionalDetails :  [
                    {
                        headerText: "Division wise count",
                        data: req.body.gsDivisionId == 0 ? reportData.data[1] : []
                    }
                ]
            }
            return successResponse(response, "Success", res);
        }
        catch (error) {
            return failureResponse(error.message,res);
        }
    }
}