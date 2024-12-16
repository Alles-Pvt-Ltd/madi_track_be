import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { MedicalHistory } from "../../database/mysql/medicalhistory";
import { JwtToken } from "../../core/jwt";
import { FileUpload } from "../../core/fileUpload";
import { successResponse, failureResponse } from "../../core/response";

interface MulterRequest extends Request {
  file: Express.Multer.File | undefined;
}

export class MedicalHistoryController {
  // Add Medical History
  public add = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return failureResponse("Validation failed", res);
        }

        const { userId, treatmentDate, treatmentType, location } = req.body;
        const tokenData = JwtToken.get(req);

        if (!tokenData || isNaN(Number(tokenData.userId))) {
            return failureResponse("Invalid or missing token data", res);
        }

        const createdBy = Number(tokenData.userId);
        const parsedUserId = Number(userId);

        if (isNaN(parsedUserId)) {
            return failureResponse("Invalid user ID", res);
        }

        const reportFileUrl = req.file 
            ? `/upload/reports/${req.file.filename}` 
            : req.body.reportFileUrl;

        if (!reportFileUrl) {
            return failureResponse("Report file URL is required", res);
        }

        const addResponse = await MedicalHistory.addMedicalHistory(
            parsedUserId,
            treatmentDate,
            treatmentType,
            location,
            reportFileUrl,
            createdBy
        );

        if (addResponse.err) {
            return failureResponse(addResponse.message, res);
        }

        const response = {
            ...addResponse.data,
            createdBy: createdBy === 0 ? "admin" : "user",
        };

        return successResponse(response, "Medical History Added Successfully", res);
    } catch (error) {
        return failureResponse("Error adding medical history: " + error.message, res);
    }
};



public update = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return failureResponse("Validation failed", res);
        }

        const { hid } = req.params;
        const { userId, treatmentDate, treatmentType, location, reportFileUrl } = req.body;
        const tokenData = JwtToken.get(req);

        const parsedHid = Number(hid);
        const parsedUserId = Number(userId);
        const updatedBy = tokenData && tokenData.userId ? Number(tokenData.userId) : NaN;

        if (isNaN(parsedHid) || isNaN(parsedUserId) || isNaN(updatedBy)) {
            return failureResponse("Invalid ID or User ID", res);
        }

        const reportUrl = req.file ? `/upload/reports/${req.file.filename}` : reportFileUrl;
 
        const result = await MedicalHistory.updateMedicalHistory(
            parsedHid,
            parsedUserId,
            treatmentDate,
            treatmentType,
            location,
            reportUrl,
            updatedBy
        );

        if (result.err) {
            return failureResponse(result.message, res);
        }

        const response = {
            ...result.data,
            updatedBy: updatedBy === 0 ? "admin" : "user",
        };

        return successResponse(response, "Medical History Updated Successfully", res);
    } catch (err) {
        return failureResponse("Error updating medical history: " + err.message, res);
    }
};
public getMedihis = async (req: Request, res: Response): Promise<void> => {
  try {
      const hid = parseInt(req.params.hid, 10);

      if (isNaN(hid)) {
          return failureResponse("Invalid HID provided", res);
      }

      const tokenData = JwtToken.get(req);

      if (!tokenData || isNaN(Number(tokenData.userId))) {
          return failureResponse("Invalid or missing token data", res);
      }

      const historyResponse = await MedicalHistory.getMedicalHistoryById(hid);

      if (historyResponse.err) {
          return failureResponse(historyResponse.message, res);
      }

      const history = historyResponse.data[0]?.message;

      if (history) {
          const messageLowerCase = history.toLowerCase();

          if (messageLowerCase === "user does not exist") {
               res.status(404).json({
                  code: 404,
                  status: false,
                  message: "Medical history not found",
              });
          }

          if (messageLowerCase === "user is deleted") {
               res.status(200).json({
                  code: 200,
                  status: false,
                  message: "User is deleted",
              });
          }

          if (messageLowerCase === "history is deleted") {
               res.status(200).json({
                  code: 200,
                  status: false,
                  message: "User is deleted", 
              });
          }
      }

      if (historyResponse.data[0]) {
           res.status(200).json({
              code: 200,
              status: true,
              message: "Medical history retrieved successfully",
              data: historyResponse.data[0],
          });
      }

       res.status(404).json({
          code: 404,
          status: false,
          message: "No data available for the history",
      });
  } catch (error) {
      if (!res.headersSent) {
          return failureResponse("An unexpected error occurred: " + error.message, res);
      }
  }
};

  // Delete Medical History
public delete = async (req: Request, res: Response)=> {
    try {
        const hid = parseInt(req.params.hid, 10); 
        const tokenData = JwtToken.get(req); 

        if (!tokenData || isNaN(Number(tokenData.userId))) {
            res.status(401).json({
                code: 401,
                status: false,
                message: 'Unauthorized access: Invalid or missing token',
            });
            return; 
        }

        if (isNaN(hid)) {
            res.status(400).json({
                code: 400,
                status: false,
                message: 'Invalid HID provided',
            });
            return;
        }

        const userId = Number(tokenData.userId);

        const historyResponse = await MedicalHistory.getMedicalHistoryById(hid);
        if (historyResponse.err) {
            res.status(500).json({
                code: 500,
                status: false,
                message: historyResponse.message || 'Error fetching medical history',
            });
            return; 
        }

        const history = historyResponse.data[0]; 
        if (!history) {
            res.status(404).json({
                code: 404,
                status: false,
                message: 'Medical history not found',
            });
            return;
        }

        if (history.message === 'User is deleted') {
            res.status(200).json({
                code: 200,
                status: false,
                message: 'Medical history already marked as deleted',
            });
            return; 
        }

        const result = await MedicalHistory.deleteMedicalHistory(hid);
        if (result.err) {
            res.status(500).json({
                code: 500,
                status: false,
                message: result.message || 'Error deleting medical history',
            });
            return; 
        }

        res.status(200).json({
            code: 200,
            status: true,
            message: 'Medical history deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: false,
            message: 'An unexpected error occurred',
        });
    }
};


  // List All Medical Histories
  public list = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await MedicalHistory.getAllMedicalHistory();

        if (result.err) {
            return failureResponse(result.message, res);
        }

        const data = result.data.map((item: any) => ({
            ...item,
            createdBy: item.createdBy === 0 ? "admin" : "user",
            updatedBy: item.updatedBy === 0 ? "admin" : "user",
        }));

        return successResponse(data, "Medical history fetched successfully", res);
    } catch (err) {
        return failureResponse("Error fetching medical history: " + err.message, res);
    }
};

}
