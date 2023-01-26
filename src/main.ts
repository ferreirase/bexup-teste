import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT, () => {
    console.log(`SERVER listening on port ${process.env.PORT}`);
  });
}
bootstrap();
