import { Request, Response, NextFunction } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { failureResponse } from "../modules/common/service";


export class FileUpload {

  // public static fileUpload() {
    private static MIME_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
    };

     public static fileUpload= multer({
      limits: 500000,
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "upload/images");
        },
        filename: (req:Request, file, cb) => {
          // // console.log(file);
          const ext:any = FileUpload.MIME_TYPE_MAP[file.mimetype];
          // const ext:any = this.MIME_TYPE_MAP[file.mimetype];
          cb(null,uuidv4() + "." + ext);
        }
      }),
      fileFilter: (req, file, cb,res) => {
        const isValid:any = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        // const isValid:any = !!this.MIME_TYPE_MAP[file.mimetype];
        let err = isValid
          ? null
          : failureResponse("different type of file", null, res);
        cb(err, isValid);
      },
    });
  // }
}


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