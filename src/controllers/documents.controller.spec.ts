import { DocumentsController } from './documents.controller';
import { DocumentService } from '../services/documents.service';
import { Test } from '@nestjs/testing';
import { DocumentType } from '../database/db';

const mockDocuments: Array<DocumentType> | [] = [
  {
    title: 'media_dog.png',
    location: '/documents/media_dog.png',
    size: '0.48MB',
    type: 'image/png',
    createdAt: new Date('2023-01-25T21:44:13.626Z'),
  },
];

describe('Documents Controller', () => {
  let documentsController: DocumentsController;
  let documentService: DocumentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentService,
          useValue: {
            getAllDocuments: jest.fn(() => mockDocuments),
            uploadNewDocument: jest.fn(() => mockDocuments[0]),
          },
        },
      ],
    }).compile();

    documentsController =
      moduleRef.get<DocumentsController>(DocumentsController);

    documentService = moduleRef.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(documentsController).toBeDefined();
    expect(documentService).toBeDefined();
  });

  describe('Get All Documents Method', () => {
    it('should return an array of documents', () => {
      const documents = documentsController.getAllDocuments();

      expect(documentService.getAllDocuments).toHaveBeenCalledTimes(1);
      expect(documents[0]).toHaveProperty('title');
    });

    it('should return a document by title', () => {
      const documents = documentsController.getAllDocuments('dog');

      expect(documentService.getAllDocuments).toHaveBeenCalledTimes(1);
      expect(documents.length).toBeGreaterThan(0);
      expect(documents[0]).toHaveProperty('title');
    });
  });
});
