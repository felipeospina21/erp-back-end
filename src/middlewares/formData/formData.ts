import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import busboy from 'busboy';

export function formData(req: Request, res: Response, next: NextFunction) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const bus = busboy({ headers: req.headers });
  req.body = {};

  let uploadingImage = false;
  let uploadingCount = 0;

  function done() {
    if (uploadingImage) return;
    if (uploadingCount > 0) return;

    next();
  }

  bus.on('field', (key, value) => {
    req.body[key] = value;
  });

  bus.on('file', (key, file) => {
    uploadingImage = true;
    uploadingCount++;

    const stream = cloudinary.uploader.upload_stream({ upload_preset: 'dlt_erp' }, (err, res) => {
      if (err) {
        throw err;
      }
      req.body[key] = res?.secure_url;
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
