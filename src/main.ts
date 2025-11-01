import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  const ENV = process.env.NODE_ENV ?? '_';
  app.enableCors();


  await app.listen(PORT, '0.0.0.0');
  console.log(`Application running on port ${PORT} [${ENV}]`);
}
bootstrap();
