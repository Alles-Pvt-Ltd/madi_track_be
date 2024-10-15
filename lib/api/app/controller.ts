import { Request, Response } from "express";
import { App } from "../../database/mysql/app";
import { failureResponse, successResponse } from "../../core/response";
import { FileUpload } from "../../core/fileUpload";
import { API_BASE_URL, MEDIA_SERVER_URL } from "../../core/common/constant";
import {  sendMessage } from "../../external/notification";

interface MulterRequest extends Request {
    file: any;
  }
  
  interface IFile{
    fieldname: string,
    originalname: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
  }

export class AppController {
    public getAppInfo = async (req: Request, res: Response) => {
        const version = req.body.version;
        const getAppVersion = await App.getAppVersion(parseInt(version.split('.').join("")));
        if(getAppVersion.err)
        {
            return failureResponse(getAppVersion.message,res);
        }
        const response = {
            isAppUpdate: getAppVersion.data.length > 0,
            mediaBaseUrl: MEDIA_SERVER_URL,
            baseUrl: API_BASE_URL
        }
        return successResponse(response,"Success",res);
    }

    public uploadImage = async (req: Request, res: Response) => {
        FileUpload.upload(req, res, (err: Error)=> {
         if(err){
           return failureResponse(err.message, res);
         }
         
         const documentFile  = (req as MulterRequest).file as IFile;
        //  return successResponse({imageUrl: '/'+documentFile.path },"Success", res);
        return successResponse({imageUrl: '/'+documentFile.destination+'/'+documentFile.filename },"Success", res);
       });
     };



     public sendMessage = async (req: Request, res: Response) => {   
      await   sendMessage("0777355075", `gs Division id : ${req.body.gsDivisionId} village id: ${req.body.villageId}, and message: ${req.body.message}`);
      await   sendMessage("0775014901", `gs Division id : ${req.body.gsDivisionId} village id: ${req.body.villageId}, and message: ${req.body.message}`);
      return successResponse("Success","Success", res);
   };
}