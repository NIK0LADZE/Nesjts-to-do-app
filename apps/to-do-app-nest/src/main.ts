/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
