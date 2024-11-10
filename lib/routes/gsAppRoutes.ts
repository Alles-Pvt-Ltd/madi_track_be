import { UserRoutes } from "../api/user/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';
import { Verify } from "../app/verify_token";
import { AppRoute } from "../api/app/routes";

export class GsAppRoutes {
    private userRoutes: UserRoutes = new UserRoutes();
    private appRoutes: AppRoute = new AppRoute();
    private verify : Verify = new Verify();
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        
        
        this.userRoutes.route(app,this.appConstant.baseURL+'/user');
        this.appRoutes.route(app,this.appConstant.baseURL+'/app');
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}