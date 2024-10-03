import { Application, Request, Response } from "express";
import { FamilyController } from "./controller";
import { JwtToken } from "../../core/jwt";
import { Validation } from "./class";

export class FamilyRoutes {
    private userCtrl: FamilyController = new FamilyController();

    public route(app: Application, url: string) {
        app.post(
            url + "/add",
            Validation.addFamilyValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.addFamily(req, res);
            }
        );

        app.get(
            url + "/list/:divisionId",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.getAllFamiliesDetails(req, res);
            }
        );

        app.post(
            url + "/member/add",
            Validation.addMemberValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.addMember(req, res);
            }
        );

        app.get(
            url + "/member/:id",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.getMemmberById(req, res);
            }
        );

        app.put(
            url + "/member/update",
            Validation.updateMemberValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.updateMember(req, res);
            }
        );

        app.get(
            url + "/view/:familyId",
            JwtToken.verify,  // Adding JWT verification for consistency
            (req: Request, res: Response) => {
                this.userCtrl.getFamilyDetailsById(req, res);
            }
        );

        app.post(
            url + "/history/add",
            Validation.familyHistoryValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.addHistory(req, res);
            }
        );

        // Family update
        app.put(
            url + "/update",
            Validation.updateFamilyValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.updateFamily(req, res);
            }
        );

        app.put(
            url + "/history/update",
            Validation.familyHistoryUpdateValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.updateHistory(req, res);
            }
        );

        app.post(
            url + "/history/delete/:id",
            JwtToken.verify,
            (req:Request, res:Response) => {
              this.userCtrl.deleteHistory(req,res)
            }
        );

        app.post(
            url + "/transfer/request",
            // Validation.addMemberValidation,
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.initiateFamilyTransfer(req, res);
            }
        );

        app.post(
            url + "/transfer/member",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.initiateMemberTransfer(req, res);
            }
        );

        app.get(
            url + "/transfer/list",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.getAllFamilyTransfersForAGsDivision(req, res);
            }
        );

        app.post(
            url + "/transfer/update",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.transferAcceptOrRejectByGs(req, res);
            }
        );

        app.post(
            url + "/property/add",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.addProperty(req, res);
            }
        );

    }
}
