import { Request, Response } from "express";
import { badResponse, failureResponse, successResponse } from "../../core/response";
import { validationResult } from "express-validator";
import { Admin } from "../../database/mysql/admin";
import { JwtToken } from "../../core/jwt";
import { User } from "../../database/mysql/user"
import { log } from "console";

export class AdminController {
    public getAllGsList = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        var userData = User.getUserByCode(jwtData.code);
        const gsList = await Admin.getAllGsList((await userData).data[0].gsDivisionId);
        if(gsList.err)
        {
            return failureResponse(gsList.message, res);
        }

        return successResponse(gsList.data, gsList.message, res);
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
        const dsDivisionId = parseInt(req.params.divisionId);
        const transferList = await Admin.getAllFamilyTransfers(dsDivisionId);

        if(transferList.err)
        {
            return failureResponse(transferList.message, res);
        }

        return successResponse(transferList.data, transferList.message, res);
    }

    public updateFamilyTransferStatus = async (req: Request, res: Response) => {
        const updatedData = await Admin.transferAcceptOrRejectByDs(req.body);
        if(updatedData.err)
        {
            return failureResponse(updatedData.message,res);
        }

        return successResponse(updatedData.data, updatedData.message, res);
    }
    

    public getMembersByFamilyId = (req: Request, res: Response) => {
        const familyId = parseInt(req.params.familyId);
        console.log("Request received for familyId:", familyId);

        if (isNaN(familyId)) {
            return failureResponse("Invalid familyId parameter. Please provide a valid family ID.", res);
        }

        Admin.getMembersByFamilyId(familyId)
            .then(membersList => {
                if (membersList.err) {
                    console.error("Error while retrieving members list:", membersList.message);
                    return failureResponse(membersList.message, res);
                }
                console.log("Members list successfully retrieved:", membersList.data);
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
            return successResponse(reportData.data[0],"Report Generated Successfully",res);
        }
        catch (error) {
            return failureResponse(error.message,res);
        }
    }
}