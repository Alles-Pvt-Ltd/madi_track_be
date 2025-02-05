import { Application } from "express";
import { MedicalHistoryController } from "./controller";
import { Validation } from "./class";
import { JwtToken } from "../../core/jwt";
import { FileUpload } from "../../core/fileUpload";

export class MedicalHistoryRoutes {
  private mediCtrl: MedicalHistoryController = new MedicalHistoryController();

  public route(app: Application, url: string) {
    app.post(
      `${url}/add`,
      JwtToken.verify,
      FileUpload.upload("document"),
      Validation.addValidation,
      this.mediCtrl.add
    );

    app.put(
      `${url}/update/:hid`,
      JwtToken.verify,
      FileUpload.upload("document"),
      Validation.updateValidation,
      this.mediCtrl.update
    );

    app.delete(`${url}/delete/:hid`, 
      JwtToken.verify, 
      this.mediCtrl.delete
    );

    app.get(`${url}/getMedihis/:hid`,
      JwtToken.verify,
      this.mediCtrl.getMedihis
    );

    app.get(`${url}/list`, 
      JwtToken.verify, 
      this.mediCtrl.list
    );
  }
}
