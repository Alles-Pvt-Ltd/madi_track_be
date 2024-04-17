import { Application, Request, Response } from 'express';
import { UserController } from './controller';

export class DistrictRoutes {

    private userController: UserController = new UserController();

    public route(app: Application, url:String) {
        
        app.post(url+'/addDistrict', (req: Request, res: Response) => {
            this.userController.addDistrict(req, res);
        });

        // Get all GS divisions by district id
        app.get(url+'/:districtId/gsdivisions', (req: Request, res: Response) => {
            this.userController.getAllGsDivisions(req, res);
        });

        //Get all DS divisions by district id
        app.get(url+'/:districtId/DSdivisions', (req: Request, res: Response) => {
            this.userController.getAllDsDivisions(req, res);
        });

        //Get All Districts
        app.get(url+'', (req: Request, res: Response) => {
            this.userController.getAllDistricts(req, res);
        });

        // Get all GS divisions by Ds Division id
        app.get(url+'/:districtId/:ds_divisions_id', (req: Request, res: Response) => {
            this.userController.getAllGsDivisionsByDsDivisionId(req, res);
        });

        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });

        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });

    }
}