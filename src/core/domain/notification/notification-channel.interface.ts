import { Notification } from './notification.entity';

export interface NotificationChannel {
    readonly type: string;
    send(notification: Notification): Promise<void>;
}