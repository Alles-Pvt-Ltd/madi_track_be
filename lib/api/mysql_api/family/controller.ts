import { Request, Response } from "express";
import { Family } from "../../../database/mysql/family";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { validationResult } from "express-validator";
import Helper from "./helper";
import { User } from "../../../database/mysql/user";
import { JwtToken } from "../../../core/jwt";

export class FamilyController {
    public addFamily = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
        }

        const body = req.body; 
        const duplicateFamily = await Family.getDuplicateFamily(body.nicNo);
        if(duplicateFamily.data.length !== 0)
        {
            return failureResponse("Family Already Exist",res);
        }
        const addedFamily = await Family.addFamily(body);

        if(addedFamily.err)
        {
            return failureResponse(addedFamily.message,res);
        }

        return successResponse(addedFamily.data, "Family Added Successfully", res);
    }

    public getAllFamiliesDetails = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        const userInfo = await User.getUserByCode(jwtData.code);
        if (userInfo.err) {
            return failureResponse(userInfo.message, res);
        }

        const familiesDetails = await Family.getAllFamiliesDetails(userInfo.data[0].gsDivisionId);
        if(familiesDetails.err)
        {
            return failureResponse(familiesDetails.message, res);
        }

        return successResponse(Helper.familyResponse(familiesDetails.data[0],familiesDetails.data[1]), "Families Got Successfully", res);
    }

    public addMember = async (req: Request, res: Response) => {
        const body = req.body;
        const duplicateMember = await Family.getDuplicateMember(body.nicNo);
        if(duplicateMember.data.length !== 0)
        {
            return failureResponse("Member Already Exist",res);
        }

        const insertedData = await Family.addMember(body);

        if(insertedData.err)
        {
            return failureResponse(insertedData.message, res);
        }

        return successResponse(insertedData.data, "Member Added Successfully", res);
    }

    public updateMember = async (req: Request, res: Response) => {
        const body = req.body;
        const updatedData = await Family.updateMemmber(body);

        if(updatedData.err)
        {
            return failureResponse(updatedData.message, res);
        }

        return successResponse(updatedData.data, "Member updated Successfully", res);
    }
}