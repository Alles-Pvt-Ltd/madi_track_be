import { Application, Request, Response } from "express";
import { FamilyController } from "./controller";
import { Validation } from "./class";

export class FamilyRoutes {
  private userCtrl: FamilyController = new FamilyController();

  public route(app: Application, url: string) {
    app.post(
      url + "/add",
      Validation.addFamilyValidation,
      (req: Request, res: Response) => {
        this.userCtrl.addFamily(req, res);
      }
    );

    app.get(
      url + "/list/:divisionId",
      (req: Request, res: Response) => {
        this.userCtrl.getAllFamiliesDetails(req, res);
      }
    );
  }
}
