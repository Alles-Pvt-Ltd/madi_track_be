import { Request, Response } from "express";
import { Family } from "../../../database/mysql/family";
import { badResponse, failureResponse, successResponse } from "../../../core/response";
import { validationResult } from "express-validator";

export class FamilyController {
    public addFamily = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return badResponse(errors.array(), res);
        }

        const body = req.body; 
        const addedFamily = await Family.addFamily(body);

        if(addedFamily.err)
        {
            return failureResponse(addedFamily.message,res);
        }

        return successResponse(addedFamily.data, "Family Added Successfully", res);
    }
}