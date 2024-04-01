import { Application, Request, Response } from 'express';
import { UserController } from './controller';
import { Verify } from "../../app/verify_token";
import { Validation } from "../../api/gs/class";

export class UserRoutes {

    private userController: UserController = new UserController();
    private verify:Verify=new Verify();
    private validation:Validation=new Validation();

    public route(app: Application, url:string) {
        
        //create user
        app.post(url+'/register',this.validation.registerValidation,(req: any, res: Response) => {
            this.userController.userRegistration(req, res);
        });

        //login
        app.post(url+'/login',this.validation.loginValidation,(req: Request, res: Response) => {
            this.userController.login(req, res);
        });

        app.post(url+'/addFamily/:divisionId',(req: Request, res: Response) => {
            this.userController.addFamily(req, res);
        });

        app.get(url+'/:divisionId/:familyId', (req: Request, res: Response) => {
            this.userController.get_family(req, res);
        });

        app.put(url+'/:gsDivisionId/:familyId', (req: Request, res: Response) => {
            this.userController.update_Family(req, res);
        });

        app.delete(url+'/:divisionId/:familyId', (req: Request, res: Response) => {
            this.userController.delete_family(req, res);
        });

        //Add family Member
        app.post(url+'/:divisionId/:familyId/addMember',(req: Request, res: Response) => {
            this.userController.addMember(req, res);
        });

        //Delete Family Member
        app.delete(url+'/:divisionId/:familyId/members/:memberId',this.verify.verify, (req: Request, res: Response) => {
            this.userController.deleteMember(req, res);
        });

        //Update Family Member
        app.put(url+'/:gsDivisionId/:familyId/members/:memberId',this.verify.verify, (req: Request, res: Response) => {
            this.userController.updateMember(req, res);
        });

        //Search family 
        app.get(url+'/:divisionId', (req: Request, res: Response) => {
            this.userController.searchFamily(req, res);
        });
    }
}