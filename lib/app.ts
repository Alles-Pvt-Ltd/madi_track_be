import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { GsAppRoutes } from "./routes/gsAppRoutes";
import { CommonRoutes } from "./routes/commonRoutes";

class App {
  public app; 
  private commonRoutes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express();
    this.config(); 
    new GsAppRoutes(this.app); 
    this.commonRoutes.route(this.app); 
  }

  private config(): void {
    this.app.use(cors());
    this.app.use('/upload/images', express.static('upload/images'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app; 
