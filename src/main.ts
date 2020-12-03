import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    exposedHeaders: ["Authorization", "content-type", "TrackId", 'refresh'],
    origin: '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    'optionsSuccessStatus': 200
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(5000);
}
bootstrap();
