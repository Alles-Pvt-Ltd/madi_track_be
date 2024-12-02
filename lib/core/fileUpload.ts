import { Request } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

export class FileUpload {
  private static MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };

  public static upload = (type: "image") =>
    multer({
      limits: { fileSize: 5000000 }, 
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const baseDir = "upload/images"; 
          const dir = path.join(__dirname, baseDir);
          fs.mkdirSync(dir, { recursive: true }); 
          cb(null, dir);
        },
        filename: (req: Request, file, cb) => {
          const ext: string | undefined = FileUpload.MIME_TYPE_MAP[file.mimetype];
          if (!ext) {
            cb(new Error("Invalid file type"), null);
          } else {
            cb(null, `${uuidv4()}.${ext}`); 
          }
        },
      }),
      fileFilter: (req: Request, file, cb) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        if (isValid) {
          cb(null, true); 
        } else {
          cb(new Error("Invalid file type") as any, false); 
        }
      },
    }).single("image"); 
}
