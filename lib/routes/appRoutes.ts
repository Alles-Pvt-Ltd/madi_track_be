import { UserRoutes } from "../api/user/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';

export class AppRoutes {
    //its from ..api/user
    private userRoutes: UserRoutes = new UserRoutes();
   
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        

        this.userRoutes.route(app,this.appConstant.baseURL+'/users');
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}