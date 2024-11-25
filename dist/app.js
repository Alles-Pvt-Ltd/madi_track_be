"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const gsAppRoutes_1 = require("./routes/gsAppRoutes");
const commonRoutes_1 = require("./routes/commonRoutes");
class App {
    constructor() {
        this.commonRoutes = new commonRoutes_1.CommonRoutes();
        this.app = express();
        this.config();
        new gsAppRoutes_1.GsAppRoutes(this.app);
        this.commonRoutes.route(this.app);
    }
    config() {
        this.app.use(cors());
        this.app.use('/upload/images', express.static('upload/images'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
