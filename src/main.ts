import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


async function bootstrap() {
  //const app = await NestFactory.create(AppModule);

  //app.enableCors();
  const app = await NestFactory.create(AppModule, { cors: {credentials: true, origin: process.env.CLIENT_URL} })

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);

}
bootstrap();
