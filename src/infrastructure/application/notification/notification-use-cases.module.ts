import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';
// import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { ConsoleNotificationChannel } from 'src/infrastructure/channels/console-notification.channel';
import { LogAuditEventUseCase } from 'src/core/application/audit/use-cases/log-audit-event.use-case';
import { LoggingService } from 'src/core/application/logging/services/logging.service';
import { WebsocketModule } from 'src/infrastructure/interfaces/websocket/websocket.module';
import { WebSocketNotificationChannel } from 'src/infrastructure/interfaces/websocket/websocket-notification.channel';

@Module({
    imports: [WebsocketModule],
    providers: [
        SendNotificationUseCase,
        // {
        //   provide: NotificationRepositoryPort,
        //   useClass: Pg,
        // },
        {
            provide: 'NotificationChannels',
            useFactory: (wsChannel: WebSocketNotificationChannel) => [
                new ConsoleNotificationChannel(),
                wsChannel,
            ],
            inject: [WebSocketNotificationChannel],
        },
        LogAuditEventUseCase,
        LoggingService,
    ],
    exports: [SendNotificationUseCase],
})
export class NotificationUseCasesModule { }
