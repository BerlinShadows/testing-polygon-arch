import { Module } from '@nestjs/common';

import { RabbitMQAdapter } from './rabbitmq/rabbitmq.adapter';
import { MessageBrokerPort } from 'src/core/application/messaging/ports/message-broker.port';
import { SendMessageUseCase } from 'src/core/application/messaging/use-cases/send-message.use-case';
import { RabbitMQConfigModule } from '../config/messaging-config/messaging-config.module';

@Module({
  imports: [RabbitMQConfigModule],
  providers: [
    {
      provide: MessageBrokerPort,
      useClass: RabbitMQAdapter,
    },
    SendMessageUseCase,
  ],
  exports: [SendMessageUseCase],
})
export class MessagingModule {}
