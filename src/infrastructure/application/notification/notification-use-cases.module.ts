import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';
import { ConsoleNotificationChannel } from 'src/infrastructure/channels/console-notification.channel';
import { LogAuditEventUseCase } from 'src/core/application/audit/use-cases/log-audit-event.use-case';
import { LoggingService } from 'src/core/application/logging/services/logging.service';
import { WebsocketModule } from 'src/infrastructure/interfaces/websocket/websocket.module';
import { WebSocketNotificationChannel } from 'src/infrastructure/interfaces/websocket/websocket-notification.channel';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';
import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { AuditUseCasesModule } from '../audit/audit-use-cases.module';
import { NotificationChannel } from 'src/core/domain/notification/notification-channel.interface';
import { LoggingModule } from '../logger/logging-use-case.module';

@Module({
  imports: [
    WebsocketModule,
    DatabaseModule,
    AuditUseCasesModule,
    LoggingModule,
  ],
  providers: [
    {
      provide: 'NotificationChannels',
      useFactory: (wsChannel: WebSocketNotificationChannel) => [wsChannel],
      inject: [WebSocketNotificationChannel],
    },
    {
      provide: SendNotificationUseCase,
      useFactory: (
        repo: NotificationRepositoryPort,
        channels: NotificationChannel[],
        audit: LogAuditEventUseCase,
        logger: LoggingService,
      ) => new SendNotificationUseCase(repo, channels, audit, logger),
      inject: [
        NotificationRepositoryPort,
        'NotificationChannels',
        LogAuditEventUseCase,
        LoggingService,
      ],
    },
  ],
  exports: [SendNotificationUseCase],
})
export class NotificationUseCasesModule {}
