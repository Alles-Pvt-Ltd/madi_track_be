"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// import environment from "./config/environment";
// import { AppRoutes } from "./routes/appRoutes";
const gsAppRoutes_1 = require("./routes/gsAppRoutes");
const commonRoutes_1 = require("./routes/commonRoutes");
class App {
    // public mongoUrl: string = 'mongodb+srv://kandasamykowtham125:4SVO4fNy08UI7JKm@cluster0.q50tq77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    constructor() {
        this.commonRoutes = new commonRoutes_1.CommonRoutes();
        this.app = express();
        this.config(); //why this
        // this.mongoSetup();
        // new AppRoutes(this.app);
        new gsAppRoutes_1.GsAppRoutes(this.app);
        this.commonRoutes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(cors());
        this.app.use('/upload/images', express.static('upload/images'));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
