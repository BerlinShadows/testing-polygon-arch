import { NotificationChannel } from "src/core/domain/notification/notification-channel.interface";
import { Notification } from "src/core/domain/notification/notification.entity";

export class InMemoryNotificationChannel implements NotificationChannel {
    readonly type = 'in-memory';
    public readonly sent: Notification[] = [];

    async send(notification: Notification): Promise<void> {
        this.sent.push(notification);
    }
}