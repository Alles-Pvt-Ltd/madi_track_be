"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer = require("multer");
const uuid_1 = require("uuid");
const service_1 = require("../modules/common/service");
class FileUpload {
}
exports.FileUpload = FileUpload;
// public static fileUpload() {
FileUpload.MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
FileUpload.fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "upload/images");
        },
        filename: (req, file, cb) => {
            // // console.log(file);
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            // const ext:any = this.MIME_TYPE_MAP[file.mimetype];
            cb(null, (0, uuid_1.v4)() + "." + ext);
        }
    }),
    fileFilter: (req, file, cb, res) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        // const isValid:any = !!this.MIME_TYPE_MAP[file.mimetype];
        let err = isValid
            ? null
            : (0, service_1.failureResponse)("different type of file", null, res);
        cb(err, isValid);
    },
});
// import express, {Request,Response,NextFunction} from 'express';
// // import {ProductModel} from '../models/Product';
// import multer from 'multer';
// // const router = express.Router();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload/images')
//     },
//     filename: function (req: any, file: any, cb: any) {
//         cb(null, file.originalname)
//     }
// });
// const fileFilter = (req: any,file: any,cb: any) => {
//     if(file.mimetype === "image/jpg"  || 
//        file.mimetype ==="image/jpeg"  || 
//        file.mimetype ===  "image/png"){
//     cb(null, true);
//    }else{
//       cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
// }
// }
// const upload = multer({storage: storage, fileFilter : fileFilter});
// export upload;
