import { extname } from 'path';
import { PipeTransform, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class FileValidationsPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required!', 400);
    }

    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      throw new HttpException('File type not supported!', 400);
    }

    if (file.size > 20971520) {
      throw new HttpException('File size is too long!', 400);
    }

    return file;
  }
}

export const FileTypeFilter = (
  req: any,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    req.fileValidationError = 'File type not supported';
    return callback(null, false);
  }

  callback(null, true);
};

export const EditFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${name}-${randomName}${fileExtName}`);
};
