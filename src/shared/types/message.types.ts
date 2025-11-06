export interface NotificationMessage {
  id: string;
  userId: string;
  channel: string;
  title: string;
  body: string;
  payload?: Record<string, any>;
  timestamp: string;
  eventType: 'notification_created' | 'notification_processed';
}
