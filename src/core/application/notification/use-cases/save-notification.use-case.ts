import { Notification } from 'src/core/domain/notification/notification.entity';
import { NotificationRepositoryPort } from '../ports/notification.repository.port';

export class SaveNotificationUseCase {
  constructor(private readonly repository: NotificationRepositoryPort) {}

  async execute(notification: Notification): Promise<void> {
    await this.repository.save(notification);
  }
}
