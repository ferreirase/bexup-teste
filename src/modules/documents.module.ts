import { Module } from '@nestjs/common';
import { DocumentsController } from '../controllers/documents.controller';
import { DocumentService } from '../services/documents.service';
import DatabaseService from '../database/db';

@Module({
  controllers: [DocumentsController],
  providers: [DatabaseService, DocumentService],
})
export class DocumentsModule {}
