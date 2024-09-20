import { Request, Response } from "express";
import { App } from "../../../database/mysql/app";
import { failureResponse, successResponse } from "../../../core/response";

export class AppController {
    public getAppInfo = async (req: Request, res: Response) => {
        const version = req.body.version;
        const getAppVersion = await App.getAppVersion(parseInt(version.split('.').join("")));
        if(getAppVersion.err)
        {
            return failureResponse(getAppVersion.message,res);
        }
        const response = {
            isAppUpdate: getAppVersion.data.length > 0
        }
        return successResponse(response,"Success",res);
    }
}