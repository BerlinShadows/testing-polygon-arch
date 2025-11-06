import { Notification } from '../../../domain/notification/notification.entity';
import { NotificationRetryRepositoryPort } from '../ports/notification-retry-repository.port';
import { NotificationRetryServicePort } from '../ports/notification-retry-service.port';

export class RetryNotificationUseCase {
  private readonly maxAttempts = 3;

  constructor(
    private readonly retryRepo: NotificationRetryRepositoryPort,
    private readonly retryService: NotificationRetryServicePort,
  ) {}

  async execute(notification: Notification): Promise<void> {
    notification.incrementAttempt();

    if (!notification.canRetry(this.maxAttempts)) {
      notification.markAsFailed();
      await this.retryRepo.markAsProcessed(notification.id);
      return;
    }

    await this.retryRepo.saveForRetry(notification);

    const delay = Math.pow(2, notification.attempt) * 1000;
    await this.retryService.scheduleRetry(notification, delay);
  }
}
