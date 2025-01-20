import { Request } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

export class FileUpload {
  private static MIME_TYPE_MAP: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  };

  // Multer upload middleware
  public static upload = (type: "image" | "document") =>
    multer({
      limits: { fileSize: 10000000 }, // Max file size 10MB
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const baseDir =
            type === "image" ? "upload/images" : "upload/documents";
          const dir = path.join(__dirname, baseDir);
          fs.mkdirSync(dir, { recursive: true }); // Create directory if not exists
          cb(null, dir); // Set the destination
        },
        filename: (req: Request, file, cb) => {
          const ext: string | undefined = FileUpload.MIME_TYPE_MAP[file.mimetype];
          if (!ext) {
            return cb(new Error("Invalid file type"), null);
          }
          cb(null, `${uuidv4()}.${ext}`); // Unique file name
        },
      }),
      fileFilter: (req: Request, file, cb) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        cb(null, isValid); // Validate file type
      },
    }).single(type); // Use `.single()` to handle single file upload
}
