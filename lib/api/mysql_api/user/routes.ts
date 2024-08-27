import { Application, Request, Response } from "express";
import { UserController } from "./controller";
import { Validation } from "./class";

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

    app.get(
      url + "/reference",
      (req: Request, res: Response) => {
        this.userCtrl.reference(req, res);
      }
    );
  }
}
