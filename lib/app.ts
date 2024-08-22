import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';

// import environment from "./config/environment";
// import { AppRoutes } from "./routes/appRoutes";
import { GsAppRoutes } from "./routes/gsAppRoutes";
import { CommonRoutes } from "./routes/commonRoutes";

class App {
  public app; //why we use this
  private commonRoutes: CommonRoutes = new CommonRoutes();
  // public mongoUrl: string = 'mongodb+srv://kandasamykowtham125:4SVO4fNy08UI7JKm@cluster0.q50tq77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  constructor() {
    this.app = express();
    this.config(); //why this
    // this.mongoSetup();
    // new AppRoutes(this.app);
    new GsAppRoutes(this.app);
    this.commonRoutes.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(cors());
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  // private mongoSetup(): void {
  //    mongoose.connect(this.mongoUrl, { autoIndex: true,autoCreate: true, dbName: 'alles_gs' },(err)=>{
  //     if(err){
  //       console.log("Error: Could not connect mongodb => ",err)
  //     }
  //     else{
  //       console.log("Mongodb connected")
  //     }     
  //    });
  // }
}
export default new App().app;
