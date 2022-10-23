"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = void 0;
const cloudinary_1 = require("cloudinary");
const busboy_1 = __importDefault(require("busboy"));
function formData(req, res, next) {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
    const bus = (0, busboy_1.default)({ headers: req.headers });
    req.body = {};
    let uploadingImage = false;
    let uploadingCount = 0;
    function done() {
        if (uploadingImage)
            return;
        if (uploadingCount > 0)
            return;
        next();
    }
    bus.on('field', (key, value) => {
        req.body[key] = value;
    });
    bus.on('file', (key, file) => {
        uploadingImage = true;
        uploadingCount++;
        const stream = cloudinary_1.v2.uploader.upload_stream({ upload_preset: 'dlt_erp' }, (err, res) => {
            if (err) {
                throw err;
            }
            req.body[key] = res === null || res === void 0 ? void 0 : res.secure_url;
            uploadingImage = false;
            uploadingCount--;
            done();
        });
        file.on('data', (buffer) => {
            stream.write(buffer);
        });
        file.on('end', () => {
            stream.end();
        });
    });
    bus.on('close', () => {
        done();
    });
    req.pipe(bus);
}
exports.formData = formData;
