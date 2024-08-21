import { Application, Request, Response } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  private userCtrl: UserController = new UserController();

  public route(app: Application, url: string) {
    app.post(
      url + "/login",
      (req: Request, res: Response) => {
        this.userCtrl.login(req, res);
      }
    );

    app.post(
      url + "/register",
      (req: Request, res: Response) => {
        this.userCtrl.register(req, res);
      }
    );
  }
}
