import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseConfigModule } from './database-config/database-config.module';

@Module({
  imports: [AppConfigModule, DatabaseConfigModule],
  exports: [AppConfigModule, DatabaseConfigModule],
})
export class ConfigModule {}
