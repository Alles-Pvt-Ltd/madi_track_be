"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swagger_1 = require("./utils/swagger");
// import environment from "./config/environment";
const appRoutes_1 = require("./routes/appRoutes");
class App {
    constructor() {
        this.mongoUrl = 'mongodb+srv://kandasamykowtham125:4SVO4fNy08UI7JKm@cluster0.q50tq77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        this.app = express();
        this.config(); //why this
        (0, swagger_1.default)(this.app, 3000);
        this.mongoSetup();
        new appRoutes_1.AppRoutes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(cors());
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { autoIndex: true, autoCreate: true, dbName: 'alles_gs' }, (err) => {
            if (err) {
                console.log("Error: Could not connect mongodb => ", err);
            }
            else {
                console.log("Mongodb connected");
            }
        });
    }
}
exports.default = new App().app;
