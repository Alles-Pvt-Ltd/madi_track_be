import { Application, Request, Response } from 'express';
import { UserController } from './controller';

export class DivisionRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application, url:String) {
        
        app.post(url+'/addDivision', (req: Request, res: Response) => {
            this.user_controller.addDivision(req, res);
        });

        app.get(url+'/allDivisions', (req: Request, res: Response) => {
            this.user_controller.getAllDivisions(req, res);
        });

        // app.put('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.update_user(req, res);
        // });

        // app.delete('/api/gs_division/:id', (req: Request, res: Response) => {
        //     this.user_controller.delete_user(req, res);
        // });

    }
}