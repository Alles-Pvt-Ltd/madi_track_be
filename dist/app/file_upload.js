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
            const baseDir = "upload/images";
            const dir = path.join(__dirname, baseDir);
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            if (!ext) {
                cb(new Error("Invalid file type"), null);
            }
            else {
                cb(null, `${(0, uuid_1.v4)()}.${ext}`);
            }
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        if (isValid) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type"), false);
        }
    },
});
