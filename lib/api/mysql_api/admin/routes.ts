import { Application, Request, Response } from "express";
import { AdminController } from "./controller";
import { JwtToken } from "../../../core/jwt";

export class AdminRoutes {
    private adminCtrl: AdminController = new AdminController();

    public route(app: Application, url: string) {

        app.get(
            url + "/gslist/:divisionId",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getAllGsList(req, res);
            }
        );

        app.post(
            url + "/family/list",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.adminCtrl.getAllFamilies(req, res);
            }
        );
    }
}
