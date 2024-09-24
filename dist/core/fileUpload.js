"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer = require("multer");
const uuid_1 = require("uuid");
const response_1 = require("./response");
const jwt_1 = require("./jwt");
const fs = require("fs");
class FileUpload {
}
exports.FileUpload = FileUpload;
// public static fileUpload() {
FileUpload.MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
FileUpload.upload = multer({
    limits: 500000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const jwtData = jwt_1.JwtToken.get(req);
            const filesDir = 'upload/images/' + jwtData.code;
            fs.mkdirSync(filesDir, { recursive: true });
            return cb(null, filesDir);
        },
        filename: (req, file, cb) => {
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            return cb(null, (0, uuid_1.v4)() + "." + "jpg");
        },
    }),
    fileFilter: (req, file, cb, res) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        let err = isValid ? null : (0, response_1.failureResponse)("different type of file", res);
        return cb(err, isValid);
    },
}).single("image");
