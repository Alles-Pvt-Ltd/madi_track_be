"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer = require("multer");
const uuid_1 = require("uuid");
const service_1 = require("../modules/common/service");
class FileUpload {
}
exports.FileUpload = FileUpload;
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
            const ext = FileUpload.MIME_TYPE_MAP[file.mimetype];
            cb(null, (0, uuid_1.v4)() + "." + ext);
        }
    }),
    fileFilter: (req, file, cb, res) => {
        const isValid = !!FileUpload.MIME_TYPE_MAP[file.mimetype];
        let err = isValid
            ? null
            : (0, service_1.failureResponse)("different type of file", null, res);
        cb(err, isValid);
    },
});
