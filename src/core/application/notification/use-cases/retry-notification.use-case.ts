import { Notification } from '../../../domain/notification/notification.entity';
import { NotificationRetryRepositoryPort } from '../ports/notification-retry-repository.port';
import { NotificationRetryServicePort } from '../ports/notification-retry-service.port';

export class RetryNotificationUseCase {
    constructor(
        private readonly retryRepo: NotificationRetryRepositoryPort,
        private readonly retryService: NotificationRetryServicePort,
    ) { }

    async execute(notification: Notification, attempt: number): Promise<void> {
        const maxAttempts = 3;
        if (attempt >= maxAttempts) {
            notification.markAsFailed();
            return;
        }

        await this.retryRepo.saveForRetry(notification, attempt + 1);

        await this.retryService.scheduleRetry(notification, attempt + 1);
    }
}