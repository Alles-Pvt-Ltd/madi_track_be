import { Application, Request, Response } from "express";
import { FamilyController } from "./controller";
import { JwtToken } from "../../../core/jwt";
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
            url + "/list",
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
    }
}
