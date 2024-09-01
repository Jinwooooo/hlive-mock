import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const frontendOrigin = process.env.FRONTEND_URL;
  
  app.enableCors({
    origin: frontendOrigin,
    methods: 'GET,POST',
    credentials: true,
  });

  await app.listen(6000);
}
bootstrap();
