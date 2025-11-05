import { Injectable } from '@nestjs/common';

import { RabbitMQAdapter } from './rabbitmq.adapter';
import { NotificationRetryServicePort } from 'src/core/application/notification/ports/notification-retry-service.port';
import { Notification } from 'src/core/domain/notification/notification.entity';

@Injectable()
export class RabbitMQNotificationRetryService implements NotificationRetryServicePort {
    private readonly retryQueue = 'notification-retry';

    constructor(private readonly rabbitMQ: RabbitMQAdapter) { }

    async scheduleRetry(notification: Notification, attempt: number): Promise<void> {
        const delay = Math.pow(2, attempt) * 1000;

        setTimeout(async () => {
            await this.rabbitMQ.publish(this.retryQueue, {
                ...notification,
                attempt,
            });
        }, delay);
    }
}