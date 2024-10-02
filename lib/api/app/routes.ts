import { Application, Request, Response } from "express";
import { AppController } from "./controller";
import { JwtToken } from "../../core/jwt";

export class AppRoute {
  private appCtrl: AppController = new AppController();

  public route(app: Application, url: string) {
    app.post(
      url + "/info",
      (req: Request, res: Response) => {
        this.appCtrl.getAppInfo(req, res);
      }
    );

    app.post(
      url + "/upload",
      JwtToken.verify,
      (req: Request, res: Response) => {
        this.appCtrl.uploadImage(req, res);
      }
    );

  }
}