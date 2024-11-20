import { Application, Request, Response } from "express";
import { UserController } from "./controller";
import { Validation } from "./class";
import { JwtToken } from "../../core/jwt";

export class UserRoutes {
    private userCtrl: UserController = new UserController();

    public route(app: Application, url: string) {
        app.post(
            url + "/login",  // Login route
            Validation.registerValidation,  // You can adjust validation rules as per your needs
            (req: Request, res: Response) => {
                this.userCtrl.login(req, res);  // Correcting the function call
            }
        );

        app.post(
            url + "/register",  // Register route
            Validation.registerValidation,  // You can adjust validation rules as per your needs
            (req: Request, res: Response) => {
                this.userCtrl.register(req, res);  // Correcting the function call
            }
        );


        app.put(
            url + "/updateUser",  
            Validation.updateValidation,  
            (req: Request, res: Response) => {
                this.userCtrl.updateUser(req, res);  
            }
        );

        app.get(
            url + "/getAllUsers",
            (req: Request, res: Response) => {
                this.userCtrl.getAllUsers(req, res);
            }
        );

        app.get(
            url + "/getUserById/:id",
            (req: Request, res: Response) => {
                this.userCtrl.getUserById(req, res);
            }
        );

        app.get(
            url + "/deleteUser/:id",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.deleteUser(req, res);
            }
        );
    }
}
