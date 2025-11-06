import { Notification } from 'src/core/domain/notification/notification.entity';

export abstract class NotificationRetryServicePort {
  abstract scheduleRetry(
    notification: Notification,
    attempt: number,
  ): Promise<void>;
}
