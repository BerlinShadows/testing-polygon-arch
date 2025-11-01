import { NotificationChannel } from 'src/core/domain/notification/notification-channel.interface';
import { Notification } from 'src/core/domain/notification/notification.entity';

export class ConsoleNotificationChannel implements NotificationChannel {
  readonly type = 'console';

  async send(notification: Notification): Promise<void> {
    console.log(
      `[NOTIF] ${notification.channel.toUpperCase()} → ${notification.userId}`,
    );
    console.log(`  Title: ${notification.title}`);
    console.log(`  Body: ${notification.body}`);
  }
}
