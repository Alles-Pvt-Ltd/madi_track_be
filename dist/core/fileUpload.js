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
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
// Multer upload middleware
FileUpload.upload = (type) => multer({
    limits: { fileSize: 10000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const baseDir = type === "image" ? "upload/images" : "upload/documents";
            const dir = path.join(__dirname, baseDir);
            fs.mkdirSync(dir, { recursive: true }); // Create directory if not exists
            cb(null, dir); // Set the destination
        },
        filename: (req, file, cb) => {
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            if (!ext) {
                return cb(new Error("Invalid file type"), null);
            }
            cb(null, `${(0, uuid_1.v4)()}.${ext}`); // Unique file name
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        cb(null, isValid); // Validate file type
    },
}).single(type); // Use `.single()` to handle single file upload
