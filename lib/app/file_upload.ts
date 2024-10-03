import { Request, Response, NextFunction } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { failureResponse } from "../modules/common/service";


export class FileUpload {
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
          const ext:any = FileUpload.MIME_TYPE_MAP[file.mimetype];
          cb(null,uuidv4() + "." + ext);
        }
      }),
      fileFilter: (req, file, cb,res) => {
        const isValid:any = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        let err = isValid
          ? null
          : failureResponse("different type of file", null, res);
        cb(err, isValid);
      },
    });
}