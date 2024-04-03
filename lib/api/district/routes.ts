import { Application, Request, Response } from 'express';
import { UserController } from './controller';

export class DistrictRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application, url:String) {
        
        app.post(url+'/addDistrict', (req: Request, res: Response) => {
            this.user_controller.addDistrict(req, res);
        });

        app.get(url+'/:districtId', (req: Request, res: Response) => {
            this.user_controller.getAllGsDivisions(req, res);
        });

        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });

        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });

    }
}