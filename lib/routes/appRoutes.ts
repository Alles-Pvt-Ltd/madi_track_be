import { UserRoutes } from "../api/gs/routes";
import { DivisionRoutes } from "../api/gs_division/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';

export class AppRoutes {
    //its from ..api/user
    private userRoutes: UserRoutes = new UserRoutes();
    private divisionRoutes: DivisionRoutes = new DivisionRoutes();
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        

        this.userRoutes.route(app,this.appConstant.baseURL+'/gs');
        this.divisionRoutes.route(app,this.appConstant.baseURL+'/gs_Division');
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}