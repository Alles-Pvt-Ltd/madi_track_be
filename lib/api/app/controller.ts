import { Request, Response } from "express";
import { App } from "../../database/mysql/app";
import { successResponse, failureResponse,badResponse } from "../../core/response";
import { FileUpload } from "../../core/fileUpload";
import { validationResult } from "express-validator";
const { exec } = require("child_process");
import e = require("express");

interface MulterRequest extends Request {
    file: any;
  }
  
  interface IFile {
    fieldname: string;
    originalname: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
  }

export class AppController {
  public add = async (req: Request, res: Response)=> {
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
  
  public getById = async (req: Request, res: Response)=> {
    try {
        const sid = parseInt(req.params.sid, 10);

        if (isNaN(sid)) {
            return failureResponse("Invalid userId provided", res);
        }

        const introResponse = await App.getIntroById(sid);

        if (introResponse.err) {
            return failureResponse(introResponse.message, res);
        }

        if (!introResponse.data || !introResponse.data[0]) {
             res.status(404).json({
                code: 404,
                status: false,
                message: 'User does not exist',
            });
        }

        const userMessage = introResponse.data[0]?.message;

        if (userMessage) {
            const messageLowerCase = userMessage.toLowerCase();

            if (messageLowerCase === "user does not exist") {
                 res.status(404).json({
                    code: 404,
                    status: false,
                    message: 'User does not exist',
                });
            }

            if (messageLowerCase === "user is deleted") {
                 res.status(200).json({
                    code: 200,
                    status: false,
                    message: 'User is deleted',
                });
            }
        }

        if (introResponse.data[0]) {
             res.status(200).json({
                code: 200,
                status: true,
                message: 'User Retrieved Successfully',
                data: introResponse.data[0],
            });
        }

         res.status(404).json({
            code: 404,
            status: false,
            message: 'No data available for the user.',
        });

    } catch (error) {
        return failureResponse("An unexpected error occurred", res);
    }
};

public update = async (req: Request, res: Response)=> {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
           res.status(400).json({
              code: 400,
              status: false,
              message: 'Validation errors'
          });
      }

      const sid = parseInt(req.params.sid, 10); 
      if (isNaN(sid)) {
           res.status(400).json({
              code: 400,
              status: false,
              message: 'Invalid sid provided',
          });
      }

      const { title, description, img_url, updatedBy } = req.body;
      const updatedByValue = updatedBy === "admin" ? 0 : updatedBy === "user" ? 1 : null;

      if (updatedByValue === null) {
           res.status(400).json({
              code: 400,
              status: false,
              message: "Invalid 'updatedBy' value. Use 'admin' or 'user'.",
          });
      }

      const imgUrl = req.file ? `/upload/images/${req.file.filename}` : img_url;

      const updateResponse = await App.updateIntro(sid, title, description, imgUrl, updatedByValue);

      if (updateResponse.data?.[0]?.message === "Intro does not exist") {
           res.status(404).json({
              code: 404,
              status: false,
              message: 'Intro does not exist',
          });
      }

      if (updateResponse.data?.[0]?.message === "record is deleted") {
           res.status(400).json({
              code: 400,
              status: false,
              message: 'Cannot update a record that is marked as deleted',
          });
      }

      if (updateResponse.data?.[0]?.message === "Intro updated successfully") {
           res.status(200).json({
              code: 200,
              status: true,
              message: 'Intro updated successfully',
          });
      }

      res.status(500).json({
          code: 500,
          status: false,
          message: 'An unexpected error occurred',
      });

  } catch (error) {
       res.status(500).json({
          code: 500,
          status: false,
          message: 'An unexpected error occurred',
      });
  }
};



public delete = async (req: Request, res: Response) => {
  try {
      const sid = parseInt(req.params.sid, 10);

      if (isNaN(sid)) {
           res.status(400).json({
              code: 400,
              status: false,
              message: 'Invalid userId provided',
          });
      }

      const userResponse = await App.getIntroById(sid);
      if (userResponse.err) {
           res.status(500).json({
              code: 500,
              status: false,
              message: userResponse.message,
          });
      }
      const user = userResponse.data[0];
      if (!user || user.message === "User does not exist") {
           res.status(404).json({
              code: 404,
              status: false,
              message: 'User does not exist',
          });
      }

      if (user.message === "User is deleted") {
           res.status(200).json({
              code: 200,
              status: false,
              message: 'User is already deleted',
          });
      }
      const deleteResponse = await App.deleteIntro(sid);

      if (deleteResponse.err) {
           res.status(500).json({
              code: 500,
              status: false,
              message: deleteResponse.message,
          });
      }
      res.status(200).json({
          code: 200,
          status: true,
          message: 'User deleted successfully',
      });
  } catch (error) {
       res.status(500).json({
          code: 500,
          status: false,
          message: 'An unexpected error occurred',
      });
  }
};


  public getAll = async (req: Request, res: Response) => {
      const getAllResponse = await App.getAllIntro();
      if (getAllResponse.err) {
        return failureResponse(getAllResponse.message, res);
      }
      return successResponse(getAllResponse.data, "All Intro Screens Retrieved Successfully", res);
  };

  public uploadImage = async (req: Request, res: Response) => {
    try {
      const documentFile = req.file as IFile;
      if (!documentFile) {
        return failureResponse("No file provided.", res);
      }
      return successResponse(
        { imageUrl: "/" + documentFile.path },
        "Image uploaded successfully",
        res
      );
    } catch (error) {
      return failureResponse("Unexpected server error during file upload.", res);
    }
  };
  
  
  
  
}
