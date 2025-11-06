export type NotificationChannel = 'email' | 'push' | 'websocket' | 'sms';
export type NotificationStatus = 'pending' | 'sent' | 'failed';

export class Notification {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly channel: NotificationChannel,
    public readonly title: string,
    public readonly body: string,
    public readonly payload?: Record<string, any>,
    public status: NotificationStatus = 'pending',
    public readonly createdAt: Date = new Date(),
    public sentAt?: Date,
    public attempt: number = 0,
  ) {}

  markAsSent(): void {
    this.status = 'sent';
    this.sentAt = new Date();
  }

  markAsFailed(): void {
    this.status = 'failed';
  }

  incrementAttempt(): void {
    this.attempt += 1;
  }

  canRetry(maxAttempts: number = 3): boolean {
    return this.attempt < maxAttempts;
  }
}
