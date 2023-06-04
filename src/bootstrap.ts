import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { DatabaseService } from '@modules/database/database.service';

import { AppModule } from './modules/app.module';

export const bootstrap = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const prismaService = app.get(DatabaseService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend sandbox')
    .setDescription('The backend sandbox description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  return app;
};
