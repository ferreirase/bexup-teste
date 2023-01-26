import { Module } from '@nestjs/common';
import { PublicModule } from './staticServer.module';
import { DocumentsModule } from './documents.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PublicModule, DocumentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
