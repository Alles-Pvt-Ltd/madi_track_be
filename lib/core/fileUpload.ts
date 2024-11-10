import { Request, Response, NextFunction } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { failureResponse } from "./response";
import { JwtToken } from "./jwt";
const fs = require("fs");

export class FileUpload {
  // public static fileUpload() {
  private static MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };

  public static upload = multer({
    limits: 500000000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const jwtData = JwtToken.get(req);
        const filesDir = 'upload/images/'+jwtData;
        fs.mkdirSync(filesDir, { recursive: true })
        return cb(null, filesDir);
      },
      filename: (req: Request, file, cb) => {
        const ext: any = FileUpload.MIME_TYPE_MAP[file.mimetype];
        return cb(null, uuidv4() + "." + "jpg");
      },
    }),
    fileFilter: (req, file, cb, res) => {
      const isValid: any = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
      let err = isValid ? null : failureResponse("different type of file", res);
      return cb(err, isValid);
    },
  }).single("image");
}
