import { Application, Request, Response } from "express";
import { AdminController } from "./controller";
import { JwtToken } from "../../core/jwt";

export class AdminRoutes {
    private adminCtrl: AdminController = new AdminController();

    public route(app: Application, url: string) {

        app.get(
            url + "/gslist",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getAllGsList(req, res);
            }
        );
        
        app.get(
            url + "/delete-gs/:gsId",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.deleteGs(req, res);
            }
        );

        app.post(
            url + "/family/list",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getAllFamilies(req, res);
            }
        );

        app.post(
            url + "/asign-temp-gs",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.asignTempGS(req, res);
            }
        );

        app.get(
            url + "/family/transfer/list",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getAllFamilyTransfers(req, res);
            }
        ); 

        app.get(
            url + "/members/:familyId",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getMembersByFamilyId(req, res);
            }
        );

        app.post(
            url + "/report",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.generateReport(req, res);
            }
        );

    }
}

