import { Module } from '@nestjs/common';

import { NotificationGateway } from './notification.gateway';
import { WebSocketNotificationChannel } from './websocket-notification.channel';
import { LoggingModule } from 'src/infrastructure/application/logger/logging-use-case.module';

@Module({
  imports: [LoggingModule],
  providers: [NotificationGateway, WebSocketNotificationChannel],
  exports: [WebSocketNotificationChannel],
})
export class WebsocketModule {}
