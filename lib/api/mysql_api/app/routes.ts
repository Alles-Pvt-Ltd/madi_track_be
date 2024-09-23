import { Application, Request, Response } from "express";
import { AppController } from "./controller";

export class AppRoute {
  private appCtrl: AppController = new AppController();

  public route(app: Application, url: string) {
    app.post(
      url + "/info",
      (req: Request, res: Response) => {
        this.appCtrl.getAppInfo(req, res);
      }
    );

  }
}