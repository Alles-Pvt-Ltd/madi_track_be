import { Application, Request, Response } from "express";
import { UserController } from "./controller";
import { Validation } from "./class";
import { JwtToken } from "../../core/jwt";

export class UserRoutes {
    private userCtrl: UserController = new UserController();

    public route(app: Application, url: string) {
        
        app.post(
            url + "/login",
            Validation.loginValidation,
            (req: Request, res: Response) => {
                this.userCtrl.login(req, res);
            }
        );

        app.post(
            url + "/register",
            Validation.registerValidation,
            (req: Request, res: Response) => {
                this.userCtrl.register(req, res);
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

        app.delete(
            url + "/deleteUser/:id",
            JwtToken.verify,
            (req: Request, res: Response) => {
                this.userCtrl.deleteUser(req, res);
            }
        );
        
    }
 }
    
