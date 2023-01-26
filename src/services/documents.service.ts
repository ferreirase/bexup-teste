import { Injectable } from '@nestjs/common';
import Database, { DocumentType } from '../database/db';
import * as fs from 'fs/promises';
import path from 'path';

@Injectable()
export class DocumentService {
  constructor(private readonly database: Database) {}

  getAllDocuments(): Array<DocumentType> | [] {
    return this.database.getDocuments();
  }

  async uploadNewDocument(file: Express.Multer.File): Promise<DocumentType> {
    await fs.writeFile(
      path.join('src', 'documents', `${file?.originalname}`),
      file.buffer,
    );

    const newDocumentInfos: DocumentType = {
      title: file.originalname,
      location: '/documents' + `/${file?.originalname}`,
      size: Number(file.size / 1000000).toFixed(2) + 'MB',
      type: file.mimetype,
      createdAt: new Date(),
    };

    this.database.documents = [...this.database.documents, newDocumentInfos];

    return newDocumentInfos;
  }
}
