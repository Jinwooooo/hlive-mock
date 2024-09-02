import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendOrigin = process.env.FRONTEND_URL;

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
