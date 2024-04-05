import { UserRoutes } from "../api/gs/routes";
import { DivisionRoutes } from "../api/gs_division/routes";
import { DistrictRoutes } from "../api/district/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';
import { Verify } from "../app/verify_token";

export class AppRoutes {
    //its from ..api/user
    private userRoutes: UserRoutes = new UserRoutes();
    private divisionRoutes: DivisionRoutes = new DivisionRoutes();
    private districtRoutes: DistrictRoutes = new DistrictRoutes();
    private verify : Verify = new Verify();
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        
        
        this.userRoutes.route(app,this.appConstant.baseURL+'/gs');
        this.divisionRoutes.route(app,this.appConstant.baseURL+'/gs_Division');
        this.districtRoutes.route(app,this.appConstant.baseURL+'/district');
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}