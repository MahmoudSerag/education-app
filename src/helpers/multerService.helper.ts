import * as mongoose from 'mongoose';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';

export const MulterConfig = {
  storage: diskStorage({
    destination: 'src/uploads',
    filename: (req: any, file: { originalname: string }, callback) => {
      const originalName = file.originalname.split('.')[0];
      const fileId = new mongoose.Types.ObjectId().toString();
      const fileExtension = extname(file.originalname);
      const fileName = `${originalName}-${fileId}-${Date.now()}${fileExtension}`;

      return callback(null, fileName);
    },
  }),
  fileFilter: (req: Request, file: any, callback) => {
    if (!file.mimetype.includes('pdf') && req.files instanceof Array) {
      req.files.unshift(file);
      return callback(null, false);
    }

    return callback(null, true);
  },
  limits: { filesSize: 15 * 1024 * 1024, files: 5 },
};
