import { Request, Response } from "express";
import { App } from "../../database/mysql/app";
import { successResponse, failureResponse } from "../../core/response";
import { validationResult } from "express-validator";

export class AppController {
  public add = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return failureResponse("Validation failed", res);
      }

      const { title, description, img_url } = req.body;
      
      const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url; 

      const addResponse = await App.addIntro(title, description, imgUrl);
      if (addResponse.err) {
        return failureResponse(addResponse.message, res);
      }
      return successResponse(addResponse.data, "Intro Screen Added Successfully", res);
    } catch (error) {
      return failureResponse("Error adding intro: " + error.message, res);
    }
  };
  
  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const sid = parseInt(req.params.sid, 10);
      const getResponse = await App.getIntroById(sid);
      if (getResponse.err) {
        return failureResponse(getResponse.message, res);
      }
      return successResponse(getResponse.data, "Intro Screen Retrieved Successfully", res);
    } catch (error) {
      return failureResponse("Error retrieving intro: " + error.message, res);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return failureResponse("Validation failed", res);
      }

      const sid = parseInt(req.params.sid, 10);
      const { title, description, img_url } = req.body;
      
      const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url; 

      const updateResponse = await App.updateIntro(sid, title, description, imgUrl);
      if (updateResponse.err) {
        return failureResponse(updateResponse.message, res);
      }
      return successResponse(updateResponse.data, "Intro Screen Updated Successfully", res);
    } catch (error) {
      return failureResponse("Error updating intro: " + error.message, res);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const sid = parseInt(req.params.sid, 10);
      const deleteResponse = await App.deleteIntro(sid);
      if (deleteResponse.err) {
        return failureResponse(deleteResponse.message, res);
      }
      return successResponse(deleteResponse.data, "Intro Screen Deleted Successfully", res);
    } catch (error) {
      return failureResponse("Error deleting intro: " + error.message, res);
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllResponse = await App.getAllIntro();
      if (getAllResponse.err) {
        return failureResponse(getAllResponse.message, res);
      }
      return successResponse(getAllResponse.data, "All Intro Screens Retrieved Successfully", res);
    } catch (error) {
      return failureResponse("Error retrieving intros: " + error.message, res);
    }
  };
}
