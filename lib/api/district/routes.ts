import { Application, Request, Response } from 'express';
import { UserController } from './controller';

export class DistrictRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application, url:String) {
        
        app.post(url+'/addDistrict', (req: Request, res: Response) => {
            this.user_controller.addDistrict(req, res);
        });

        // Get all GS divisions by district id
        app.get(url+'/:districtId', (req: Request, res: Response) => {
            this.user_controller.getAllGsDivisions(req, res);
        });

        //Get all DS divisions by district id
        app.get(url+'/:districtId/DSdivisions', (req: Request, res: Response) => {
            this.user_controller.getAllDsDivisions(req, res);
        });

        //Get All GS Divisions
        app.get(url+'', (req: Request, res: Response) => {
            this.user_controller.getAllDistricts(req, res);
        });

        // Get all GS divisions by Ds Division id
        app.get(url+'/:districtId/:ds_divisions_id', (req: Request, res: Response) => {
            this.user_controller.getAllGsDivisionsByDsDivisionId(req, res);
        });

        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });

        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });

    }
}