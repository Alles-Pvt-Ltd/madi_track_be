import { Request, Response } from "express";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { validationResult } from "express-validator";
import { Admin } from "../../../database/mysql/admin";
import { JwtToken } from "../../../core/jwt";
import { User } from "../../../database/mysql/user"

export class AdminController {
    public getAllGsList = async (req: Request, res: Response) => {
        const divisionId = parseInt(req.params.divisionId)
        const gsList = await Admin.getAllGsList(divisionId);
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
}