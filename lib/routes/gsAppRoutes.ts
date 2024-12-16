import { UserRoutes } from "../api/user/routes";
import { AppRoutes } from "../api/app/routes";
import { MedicalHistoryRoutes } from "../api/medicalhistory/routes";
import  AppConstant from "../config/constant";
import { Application, Request, Response } from 'express';
import { Verify } from "../app/verify_token";


export class GsAppRoutes {
    private userRoutes: UserRoutes = new UserRoutes();
    private appRoutes: AppRoutes = new AppRoutes();
    private medicalhistoryRoutes: MedicalHistoryRoutes = new MedicalHistoryRoutes();
    private verify : Verify = new Verify();
    
    private appConstant: AppConstant = new AppConstant()
    // add every root here
    constructor(app: Application) {
        
        
        this.userRoutes.route(app,this.appConstant.baseURL+'/user');
        this.appRoutes.route(app,this.appConstant.baseURL+'/app');
        this.medicalhistoryRoutes.route(app,this.appConstant.baseURL+'/medicalhistory');
        
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}