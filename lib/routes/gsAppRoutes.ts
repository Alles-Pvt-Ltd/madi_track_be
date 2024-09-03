import { UserRoutes } from "../api/mysql_api/user/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';
import { Verify } from "../app/verify_token";
import { FamilyRoutes } from "../api/mysql_api/family/routes";
import { DashboardRoutes } from "../api/mysql_api/dashboard/routes";

export class GsAppRoutes {
    private userRoutes: UserRoutes = new UserRoutes();
    private familyRoutes: FamilyRoutes = new FamilyRoutes();
    private dashboardRoutes: DashboardRoutes = new DashboardRoutes();
    private verify : Verify = new Verify();
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        
        
        this.userRoutes.route(app,this.appConstant.baseURL+'/user');
        this.familyRoutes.route(app,this.appConstant.baseURL+'/family');
        this.dashboardRoutes.route(app,this.appConstant.baseURL+'/dashboard')
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}