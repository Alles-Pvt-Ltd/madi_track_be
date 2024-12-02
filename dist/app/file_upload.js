"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer = require("multer");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
class FileUpload {
}
exports.FileUpload = FileUpload;
FileUpload.MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
FileUpload.upload = (type) => multer({
    limits: { fileSize: 5000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const baseDir = "upload/images"; // The directory where images will be stored
            const dir = path.join(__dirname, baseDir);
            fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            if (!ext) {
                cb(new Error("Invalid file type"), null);
            }
            else {
                cb(null, `${(0, uuid_1.v4)()}.${ext}`); // Use UUID to avoid file name conflicts
            }
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        if (isValid) {
            cb(null, true); // Allow file
        }
        else {
            cb(new Error("Invalid file type"), false); // Reject file
        }
    },
}).single("image"); // The field name in the form is 'image'
