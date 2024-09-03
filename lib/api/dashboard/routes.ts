import { Application, Request, Response } from 'express';
import { DashboardController } from './controller';
import { Verify } from "../../app/verify_token";

export class DashboardRoutes {

    private dashboardController: DashboardController = new DashboardController();
    private verify:Verify=new Verify();

    public route(app: Application, url:string) {
        //Get dashbord data
        app.get(url+'/:gsDivisionId', this.verify.verify,(req: Request, res: Response) => {
            this.dashboardController.dashboardList(req, res);
        });

        app.post(
            url + "/deploy",
            (req: Request, res: Response) => {
              this.dashboardController.deployment(req, res);
            }
          );
    }
}