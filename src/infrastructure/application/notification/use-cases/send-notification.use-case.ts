import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { NotificationChannel } from 'src/core/domain/notification/notification-channel.interface';
import {
  Notification,
  NotificationChannel as ChannelType,
} from 'src/core/domain/notification/notification.entity';

export class SendNotificationUseCase {
  constructor(
    private readonly repository: NotificationRepositoryPort,
    private readonly channels: NotificationChannel[],
  ) {}

  async execute(
    userId: string,
    channelType: ChannelType,
    title: string,
    body: string,
    payload?: Record<string, any>,
  ): Promise<Notification> {
    const notification = new Notification(
      'notif-' + Date.now(),
      userId,
      channelType,
      title,
      body,
      payload,
    );

    await this.repository.save(notification);

    const channel = this.channels.find((c) => c.type === channelType);
    if (!channel) {
      throw new Error(`Channel ${channelType} not supported`);
    }

    try {
      await channel.send(notification);
      notification.markAsSent();
    } catch (error) {
      notification.markAsFailed();
    }

    await this.repository.save(notification);
    return notification;
  }
}
