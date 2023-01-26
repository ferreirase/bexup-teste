import { DocumentService } from '../services/documents.service';
import { Test } from '@nestjs/testing';
import { DocumentType } from '../database/db';
import { Readable } from 'stream';

const mockedDocuments: Array<DocumentType> | [] = [
  {
    title: 'media_dog.png',
    location: '/documents/media_dog.png',
    size: '0.48MB',
    type: 'image/png',
    createdAt: new Date('2023-01-25T21:44:13.626Z'),
  },
];

const mockedMulterFile: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'teahub.io-world-map-desktop-wallpaper-3216058.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: Buffer.from('254,856,789,7855'),
  size: 2370481,
  stream: new Readable(),
  destination: '',
  filename: '',
  path: '',
};

describe.only('Documents Service', () => {
  let documentService: DocumentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DocumentService,
          useValue: {
            getAllDocuments: jest.fn(() => mockedDocuments),
            uploadNewDocument: jest.fn().mockImplementation(() => {
              mockedDocuments.push({
                title: 'teahub.io-world-map-desktop-wallpaper-3216058.jpg',
                location:
                  '/documents/teahub.io-world-map-desktop-wallpaper-3216058.jpg',
                size: '2.37MB',
                type: 'image/jpeg',
                createdAt: new Date('2023-01-26T01:05:26.305Z'),
              });

              return {
                title: 'teahub.io-world-map-desktop-wallpaper-3216058.jpg',
                location:
                  '/documents/teahub.io-world-map-desktop-wallpaper-3216058.jpg',
                size: '2.37MB',
                type: 'image/jpeg',
                createdAt: new Date('2023-01-26T01:05:26.305Z'),
              };
            }),
          },
        },
      ],
    }).compile();

    documentService = moduleRef.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(documentService).toBeDefined();
  });

  describe('getAllDocuments function', () => {
    it('should return an array of documents or []', () => {
      const documents = documentService.getAllDocuments();

      expect(documents.length).toBeGreaterThan(0);
      expect(documents[0]).toEqual(mockedDocuments[0]);
    });
  });

  describe.only('Upload new document', () => {
    it('should return the last document infos saved', async () => {
      const documentsFirstLength = documentService.getAllDocuments().length;

      const newDocument = await documentService.uploadNewDocument(
        mockedMulterFile,
      );

      const documentsSecondLength = documentService.getAllDocuments().length;

      expect(documentsSecondLength).toBeGreaterThan(documentsFirstLength);
      expect(newDocument).toEqual(
        documentService.getAllDocuments()[documentsSecondLength - 1],
      );
    });
  });
});
