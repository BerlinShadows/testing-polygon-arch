import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel } from 'amqplib';
import { RabbitMQAdapter } from './rabbitmq.adapter';
import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';
import { RetryNotificationUseCase } from 'src/core/application/notification/use-cases/retry-notification.use-case';
import { Notification } from 'src/core/domain/notification/notification.entity';

@Injectable()
export class NotificationConsumer implements OnModuleInit {
    private readonly queue = 'notifications';
    private readonly retryQueue = 'notification-retry';

    constructor(
        private readonly rabbitMQ: RabbitMQAdapter,
        private readonly sendNotificationUseCase: SendNotificationUseCase,
        private readonly retryUseCase: RetryNotificationUseCase,
    ) { }

    async onModuleInit() {
        const channel: Channel = (this.rabbitMQ as any).channel;
        channel.consume(this.retryQueue, async (msg) => {
            if (msg !== null) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    const notification = new Notification(
                        data.id,
                        data.userId,
                        data.channel,
                        data.title,
                        data.body,
                        data.payload,
                    );
                    (notification as any).attempt = data.attempt;

                    await this.sendNotificationUseCase.execute(
                        notification.userId,
                        notification.channel,
                        notification.title,
                        notification.body,
                        notification.payload,
                    );

                    channel.ack(msg);
                } catch (error) {
                    console.error('Failed to retry notification:', error);
                    channel.nack(msg, false, false);
                }
            }
        });
    }
}