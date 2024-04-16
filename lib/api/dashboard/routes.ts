import { Application, Request, Response } from 'express';
import { DashboardController } from './controller';

export class DashboardRoutes {

    private dashboardController: DashboardController = new DashboardController();

    public route(app: Application, url:string) {
        //Get dashbord data
        app.get(url+'/:gsDivisionId', (req: Request, res: Response) => {
            this.dashboardController.dashboardList(req, res);
        });
    }
}