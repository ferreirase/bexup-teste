import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
  Query,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from '../services/documents.service';
import { DocumentType } from '../database/db';
import { FileValidationsPipe } from '../validators/index';

@Controller()
export class DocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/api/documents')
  getAllDocuments(@Query('title') title?: string): Array<DocumentType> | [] {
    const documents = this.documentService.getAllDocuments();

    if (!title) return documents;

    return documents.filter((doc: DocumentType) =>
      doc.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  @Post('/api/documents')
  @UseInterceptors(FileInterceptor('file', {}))
  @UsePipes(new FileValidationsPipe())
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<DocumentType | HttpException> {
    try {
      return await this.documentService.uploadNewDocument(file);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
