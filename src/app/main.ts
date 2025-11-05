import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '../infrastructure/config/app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  app.enableCors();

  await app.listen(config.port, '0.0.0.0');
  console.log(
    `[App] Application running on http://${config.host}:${config.port} [${config.env}]`,
  );
}

bootstrap();
