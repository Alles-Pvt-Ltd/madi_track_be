import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
// import environment from "./config/environment";
import { AppRoutes } from "./routes/appRoutes";

class App {
  public app: express.Application; //why we use this
  public mongoUrl: string = 'mongodb+srv://alles_gs:Alles@123SSA>@cluster0.6iz8wzi.mongodb.net/?retryWrites=true&w=majority';

  constructor() {
    this.app = express();
    this.config(); //why this
    this.mongoSetup();
    new AppRoutes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(cors());
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
     mongoose.connect(this.mongoUrl, { autoIndex: true,autoCreate: true, dbName: 'alles_gs' },(err)=>{
      if(err){
        console.log("Error: Could not connect mongodb => ",err)
      }
      console.log("Mongodb connected")
     });
  }
}
export default new App().app;
