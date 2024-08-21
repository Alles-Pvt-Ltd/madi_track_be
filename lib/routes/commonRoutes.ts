import { Application, Request, Response } from 'express';

export class CommonRoutes {
    public route(app: Application) {
 
        // Mismatch URL
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ status: false, message: 'Requested method is wrong, please check you methods ex: (get | post | put | delete )', data: {} });
        });
    }
}
