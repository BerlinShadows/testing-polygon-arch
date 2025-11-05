import { Module, Global } from '@nestjs/common';

import { RabbitMQConfigService } from './messaging-config.service';

@Global()
@Module({
  providers: [RabbitMQConfigService],
  exports: [RabbitMQConfigService],
})
export class RabbitMQConfigModule { }