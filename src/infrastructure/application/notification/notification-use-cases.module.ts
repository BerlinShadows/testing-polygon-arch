import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';
import { LogAuditEventUseCase } from 'src/core/application/audit/use-cases/log-audit-event.use-case';
import { LoggingService } from 'src/core/application/logging/services/logging.service';
import { WebsocketModule } from 'src/infrastructure/interfaces/websocket/websocket.module';
import { WebSocketNotificationChannel } from 'src/infrastructure/interfaces/websocket/websocket-notification.channel';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';
import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { AuditUseCasesModule } from '../audit/audit-use-cases.module';
import { NotificationChannel } from 'src/core/domain/notification/notification-channel.interface';
import { LoggingModule } from '../logger/logging-use-case.module';
import { RetryNotificationUseCase } from 'src/core/application/notification/use-cases/retry-notification.use-case';
import { NotificationRetryRepositoryPort } from 'src/core/application/notification/ports/notification-retry-repository.port';
import { NotificationRetryServicePort } from 'src/core/application/notification/ports/notification-retry-service.port';

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
      provide: RetryNotificationUseCase,
      useFactory: (
        repo: NotificationRetryRepositoryPort,
        service: NotificationRetryServicePort,
      ) => new RetryNotificationUseCase(repo, service),
      inject: [NotificationRetryRepositoryPort],
    },
    {
      provide: SendNotificationUseCase,
      useFactory: (
        repo: NotificationRepositoryPort,
        channels: NotificationChannel[],
        audit: LogAuditEventUseCase,
        logger: LoggingService,
        retry: RetryNotificationUseCase,
      ) => new SendNotificationUseCase(repo, channels, audit, logger, retry),
      inject: [
        NotificationRepositoryPort,
        'NotificationChannels',
        LogAuditEventUseCase,
        LoggingService,
        RetryNotificationUseCase,
      ],
    },
  ],
  exports: [SendNotificationUseCase],
})
export class NotificationUseCasesModule {}
