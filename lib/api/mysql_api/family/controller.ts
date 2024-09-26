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
        const duplicateFamily = await Family.getDuplicateFamily(body.cardNumber);
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
        const gsDivisionId = parseInt(req.params.divisionId);

        const familiesDetails = await Family.getAllFamiliesDetails(gsDivisionId);
        if(familiesDetails.err)
        {
            return failureResponse(familiesDetails.message, res);
        }

        return successResponse(Helper.familyResponse(familiesDetails.data[0],familiesDetails.data[1]), "Families Got Successfully", res);
    }

    public addMember = async (req: Request, res: Response) => {
        const body = req.body;
        const duplicateMember = await Family.getDuplicateMember(body.firstName,body.lastName,body.familyId);
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

    public getFamilyDetailsById = async (req: Request, res: Response) => {
        const familyId = parseInt(req.params.familyId);
        const familyDetails = await Family.getFamilyDetailsById(familyId);
        if (familyDetails.err) {
            return failureResponse(familyDetails.message, res);
        }

        const response = Helper.singleFamilyResponse(familyDetails.data[0], familyDetails.data[1], 
            familyDetails.data[2], familyDetails.data[3]);
        return successResponse(response, "Family Details Retrieved Successfully", res);
    }

    public addHistory = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        const userInfo = await User.getUserByCode(jwtData.code);
        if (userInfo.err) {
            return failureResponse(userInfo.message, res);
        }

        const addedHistory = await Family.addHistory(req.body, userInfo.data[0].id);
        if(addedHistory.err)
        {
            return failureResponse(addedHistory.message, res);
        }
        return successResponse(addedHistory.data,"History Added Successfully",res);
    }

    public updateFamily = async (req: Request, res: Response) => {
        const body = req.body;
        const updatedData = await Family.updateFamily(body);

        if(updatedData.err)
        {
            return failureResponse(updatedData.message, res);
        }

        return successResponse(updatedData.data, "Family updated Successfully", res);
    }

    public updateHistory = async (req: Request, res: Response) => {
        const jwtData = JwtToken.get(req);
        const userInfo = await User.getUserByCode(jwtData.code);
        if (userInfo.err) {
            return failureResponse(userInfo.message, res);
        }

        const updatedHistory = await Family.updateHistory(req.body, userInfo.data[0].id);
        if(updatedHistory.err)
        {
            return failureResponse(updatedHistory.message, res);
        }
        return successResponse(updatedHistory.data,"History Updated Successfully",res);
    }

    public deleteHistory = async (req: Request, res:Response) => {
        const jwtData = JwtToken.get(req);
        const userInfo = await User.getUserByCode(jwtData.code);
        if (userInfo.err) {
          return failureResponse(userInfo.message, res);
        }
    
        const historyDelete = await Family.deleteHistory(
          parseInt(req.params.id),
          userInfo.data[0].id
        );
        if (historyDelete.err) {
          return failureResponse(historyDelete.message, res);
        }
    
        return successResponse(historyDelete.data, "History Deleted Successfully",res);
      }

      public getMemmberById = async (req: Request, res: Response) => {
        const memberId = parseInt(req.params.id);
        const memberDetails = await Family.getMemberById(memberId);
        if (memberDetails.err) {
            return failureResponse(memberDetails.message, res);
        }
        return successResponse(Helper.memberResponse(memberDetails.data), "member Details Retrieved Successfully", res);
      }

      public initiateFamilyTransfer = async (req: Request, res: Response) => {
        const transferData = req.body;
        const transferDetail = await Family.initiateTransfer(transferData);

        if (transferDetail.err) {
            return failureResponse(transferDetail.message, res);
        }

        return successResponse(transferDetail.data[0],"Successfully initiated transfer request",res);
      }

      public initiateMemberTransfer = async (req: Request, res: Response) => {
        const transferData = req.body;
        console.log(transferData);
        const transferDetail = await Family.initiateMemberTransfer(transferData.memberId, transferData.reasonId);

        if (transferDetail.err) {
            return failureResponse(transferDetail.message, res);
        }

        return successResponse("Successfully initiated","Success",res);
      }

      public getAllFamilyTransfersForAGsDivision = async (req: Request, res: Response) => {
        const gsDivisionId = parseInt(req.params.divisionId);
        const transferList = await Family.getAllFamilyTransfersForAGsDivision(gsDivisionId);

        if (transferList.err) {
            return failureResponse(transferList.message, res);
        }
        if(transferList.data[0].length === 0)
        {
            return failureResponse("No Pending Transfers", res);
        }
        return successResponse(transferList.data[0],"Successfully get all tranfers",res);
      }

      public transferAcceptOrRejectByGs = async (req: Request, res: Response) => {
        const transferData = req.body;
        const updatedDetail = await Family.transferAcceptOrRejectByGs(transferData);

        if (updatedDetail.err) {
            return failureResponse(updatedDetail.message, res);
        }

        return successResponse(updatedDetail.data[0],"Successfully updated status",res);
      }

      public addProperty = async (req: Request, res: Response) => {
        const addedProperty = await Family.addProperty(req.body);

        if(addedProperty.err)
        {
            return failureResponse(addedProperty.message, res);
        }

        return successResponse(addedProperty.data[0],"Property Successfully Added",res);
      }

}