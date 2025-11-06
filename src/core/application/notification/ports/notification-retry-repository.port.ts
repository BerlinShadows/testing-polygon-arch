import { Notification } from 'src/core/domain/notification/notification.entity';

export abstract class NotificationRetryRepositoryPort {
  abstract saveForRetry(notification: Notification): Promise<void>;
  abstract findPendingRetries(): Promise<Notification[]>;
  abstract markAsProcessed(id: string): Promise<void>;
}
