import { Application, Request, Response } from 'express';
import { UserController } from './controller';
import { Verify } from "../../app/verify_token";
import { Validation } from "../../api/user/class";
export class UserRoutes {

    private user_controller: UserController = new UserController();
    private verify:Verify=new Verify();
    private validation:Validation=new Validation();

    public route(app: Application,url:string) {
        //login
        app.post(url+'/login',this.validation.loginValidation,(req: Request, res: Response) => {
            this.user_controller.login(req, res);
        });

        // create user
        app.post(url,this.verify.verify,this.validation.registerValidation,(req: any, res: Response) => {
            this.user_controller.addRegistration(req, res);
        });

        // get all users
        // *
        app.get(url,this.verify.verify,(req: Request, res: Response) => {
            this.user_controller.getAllUser(req, res);
        });
        
        // get user by code
        app.get(url+'/:code',this.verify.verify,(req: Request, res: Response) => {
            
            this.user_controller.getUserById(req, res);
        });

        // get user by name
        app.get(url+'/name/:name',this.verify.verify,(req: Request, res: Response) => {
            this.user_controller.getUserByName(req, res);
        });

        // get user by moile
        app.get(url+'/mobile/:mobile',this.verify.verify,(req: Request, res: Response) => {
            this.user_controller.getUserByMobileNo(req, res);
        });
        
        // update user code
        app.patch(url+'/:code',this.verify.verify,this.validation.updateUserValidation,(req: Request, res: Response) => {
            console.log(req.body);
            
            this.user_controller.updateUser(req, res);
        });

        // delete user by code
        app.delete(url+'/:code',this.verify.verify,this.validation.updateUserValidation,(req: Request, res: Response) => {
            this.user_controller.deleteUser(req, res);
        });

        app.get(url+'/topup-reload/distubuters/:page_number',this.verify.verify,(req: Request, res: Response) => {
            this.user_controller.getAllDistubuter(req, res);
        });

        app.get(url+'/distubuter/merchants/:code/:page_number',this.verify.verify,(req: Request, res: Response) => {
            this.user_controller.getMerchantByDistubuterId(req, res);
        });
    }
}