import { Injectable } from '@nestjs/common';

import { NotificationGateway } from './notification.gateway';
import { NotificationChannel } from 'src/core/domain/notification/notification-channel.interface';
import { Notification } from 'src/core/domain/notification/notification.entity';
@Injectable()
export class WebSocketNotificationChannel implements NotificationChannel {
    readonly type = 'websocket';

    constructor(private gateway: NotificationGateway) { }

    async send(notification: Notification): Promise<void> {
        this.gateway.sendToUser(notification.userId, {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            channel: notification.channel,
            createdAt: notification.createdAt.toISOString(),
        });
    }
}