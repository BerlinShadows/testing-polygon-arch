import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseConfigModule } from './database-config/database-config.module';
import { RabbitMQConfigModule } from './messaging-config/messaging-config.module';

@Module({
  imports: [AppConfigModule, DatabaseConfigModule, RabbitMQConfigModule],
  exports: [AppConfigModule, DatabaseConfigModule, RabbitMQConfigModule],
})
export class ConfigModule {}
