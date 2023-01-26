import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Readable } from 'stream';
import { FileValidationsPipe } from './index';

const mockedMulterFile: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'teahub.io-world-map-desktop-wallpaper-3216058.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: Buffer.from('254,856,789,7855'),
  size: 43000000,
  stream: new Readable(),
  destination: '',
  filename: '',
  path: '',
};

describe.only('Validators', () => {
  let validationService: FileValidationsPipe;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FileValidationsPipe],
    }).compile();

    validationService = moduleRef.get<FileValidationsPipe>(FileValidationsPipe);
  });

  it('should be defined', () => {
    expect(validationService).toBeDefined();
  });

  describe('transform function', () => {
    it('should return a httpException when the file is missing', () => {
      try {
        validationService.transform(undefined as Express.Multer.File);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error?.message).toBe('File is required!');
        expect(error?.status).toBe(400);
      }
    });

    it('should return a httpException when the file size is bigger than 20MB', () => {
      try {
        validationService.transform(mockedMulterFile);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error?.message).toBe('File size is too long!');
        expect(error?.status).toBe(400);
      }
    });

    it('should return a httpException when the file type is invalid', () => {
      try {
        validationService.transform({
          ...mockedMulterFile,
          originalname: 'file.html',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error?.message).toBe('File type not supported!');
        expect(error?.status).toBe(400);
      }
    });
  });
});
