import { Notification, NotificationChannel as ChannelType } from '../../../domain/notification/notification.entity';
import { NotificationRepositoryPort } from '../ports/notification.repository.port';
import { NotificationChannel } from '../../../domain/notification/notification-channel.interface';
import { LogAuditEventUseCase } from '../../audit/use-cases/log-audit-event.use-case';
import { LoggingService } from '../../logging/services/logging.service';
import { AuditEvent } from 'src/core/domain/audit/audit-event.entity';

export class SendNotificationUseCase {
    constructor(
        private readonly repository: NotificationRepositoryPort,
        private readonly channels: NotificationChannel[],
        private readonly auditUseCase: LogAuditEventUseCase,
        private readonly logger: LoggingService,
    ) { }

    async execute(
        userId: string,
        channelType: ChannelType,
        title: string,
        body: string,
        payload?: Record<string, any>,
    ): Promise<Notification> {
        this.logger.debug('Preparing to send notification', 'Notification', { userId, channel: channelType });

        const notification = new Notification(
            'notif-' + Date.now(),
            userId,
            channelType,
            title,
            body,
            payload,
        );

        await this.repository.save(notification);

        const channel = this.channels.find(c => c.type === channelType);
        if (!channel) {
            const error = `Channel ${channelType} not supported`;
            this.logger.error(error, 'Notification', { userId });
            throw new Error(error);
        }

        try {
            await channel.send(notification);
            notification.markAsSent();
            this.logger.info('Notification sent successfully', 'Notification', { id: notification.id });
        } catch (error) {
            notification.markAsFailed();
            this.logger.error('Failed to send notification', 'Notification', {
                id: notification.id,
                error: error.message,
            });
        }

        await this.repository.save(notification);

        await this.auditUseCase.execute(
            new AuditEvent(
                'notification-service',
                'notification_processed',
                'notification',
                {
                    notificationId: notification.id,
                    userId: notification.userId,
                    channel: notification.channel,
                    status: notification.status,
                    title: notification.title,
                }
            )
        );

        return notification;
    }
}