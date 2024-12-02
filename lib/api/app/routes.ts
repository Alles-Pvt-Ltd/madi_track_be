import { Application, Request, Response } from "express";
import { AppController } from "./controller";
import { FileUpload } from "../../core/fileUpload";
import { AppValidation } from "../../api/app/class";

export class AppRoutes {
  private appCtrl: AppController = new AppController();

  public route(app: Application, url: string) {
    app.post(
      url + "/add",
      FileUpload.upload("image"),  
      AppValidation.addValidation, 
      (req: Request, res: Response) => {
        this.appCtrl.add(req, res);
      }
    );

    app.put(
      url + "/update/:sid",
      FileUpload.upload("image"),  
      AppValidation.updateValidation, 
      (req: Request, res: Response) => {
        this.appCtrl.update(req, res);
      }
    );


    app.get(
      url + "/getById/:sid", 
      (req: Request, res: Response) => {
      this.appCtrl.getById(req, res);
    });

   
    app.delete(
      url + "/delete/:sid", 
      (req: Request, res: Response) => {
      this.appCtrl.delete(req, res);
    });


    app.get(
      url + "/getAll", 
      (req: Request, res: Response) => {
      this.appCtrl.getAll(req, res);
    });
  }
}
