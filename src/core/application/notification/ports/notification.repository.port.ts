import { Notification } from '../../../domain/notification/notification.entity';

export abstract class NotificationRepositoryPort {
  abstract save(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract findByUserId(
    userId: string,
    limit?: number,
  ): Promise<Notification[]>;
}
