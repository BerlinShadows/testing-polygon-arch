import { Injectable } from '@nestjs/common';
import { Notification } from 'src/core/domain/notification/notification.entity';
import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';

@Injectable()
export class InMemoryNotificationRepository
  implements NotificationRepositoryPort
{
  private notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);
    if (index !== -1) {
      this.notifications[index] = notification;
    } else {
      this.notifications.push(notification);
    }
  }

  async findById(id: string): Promise<Notification | null> {
    return this.notifications.find((n) => n.id === id) || null;
  }

  async findByUserId(userId: string, limit = 10): Promise<Notification[]> {
    return this.notifications
      .filter((n) => n.userId === userId)
      .slice(-limit)
      .reverse();
  }
}
