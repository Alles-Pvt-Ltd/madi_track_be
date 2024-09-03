import { Application, Request, Response } from "express";
import { DashboardController } from "./controller";
import { JwtToken } from "../../../core/jwt";
// import { Validation } from "./class";

export class DashboardRoutes {
    private dashboardCtlr: DashboardController = new DashboardController();

    public route (app: Application, url: string) {
        app.get(url + "/list/:divisionId", JwtToken.verify, (req: Request, res: Response) => {
            this.dashboardCtlr.dashboardList(req, res);
        }
        )
    }
}