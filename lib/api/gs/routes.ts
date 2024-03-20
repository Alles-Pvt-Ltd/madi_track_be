import { Application, Request, Response } from 'express';
import { UserController } from './controller';
import { Verify } from "../../app/verify_token";
import { Validation } from "../../api/gs/class";

export class UserRoutes {

    private user_controller: UserController = new UserController();
    private verify:Verify=new Verify();
    private validation:Validation=new Validation();

    public route(app: Application, url:string) {
        
        //create user
        app.post(url+'/register',this.validation.registerValidation,(req: any, res: Response) => {
            this.user_controller.userRegistration(req, res);
        });

        //login
        app.post(url+'/login',this.validation.loginValidation,(req: Request, res: Response) => {
            this.user_controller.login(req, res);
        });

        app.post(url+'/addFamily/:divisionId',(req: Request, res: Response) => {
            this.user_controller.addFamily(req, res);
        });

        app.get(url+'/:divisionId/:familyId', (req: Request, res: Response) => {
            this.user_controller.get_family(req, res);
        });

        app.put(url+'/:gsDivisionId/:familyId', (req: Request, res: Response) => {
            this.user_controller.update_Family(req, res);
        });

        app.delete(url+'/:divisionId/:familyId', (req: Request, res: Response) => {
            this.user_controller.delete_family(req, res);
        });

        //Add family Member
        app.post(url+'/:divisionId/:familyId/addMember',(req: Request, res: Response) => {
            this.user_controller.addMember(req, res);
        });

        //Delete Family Member
        app.delete(url+'/:divisionId/:familyId/members/:memberId', (req: Request, res: Response) => {
            this.user_controller.deleteMember(req, res);
        });

        //Update Family Member
        // app.put(url+'/:gsDivisionId/:familyId/members/:memberId', (req: Request, res: Response) => {
        //     this.user_controller.updateMember(req, res);
        // });

    }
}