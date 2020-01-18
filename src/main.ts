import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('vrtnev Music')
      .setDescription('Документация:')
      .setVersion('1.6')
      .addTag('songs')
      .addTag('albums')
      .addTag('authors')
      .addTag('relations')
      .addTag('logs')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(9116);
}
bootstrap();
