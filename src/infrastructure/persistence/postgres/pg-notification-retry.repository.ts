import { Injectable } from '@nestjs/common';
import { NotificationRetryRepositoryPort } from '../../../core/application/notification/ports/notification-retry-repository.port';
import { PgDatabaseService } from '../database/pg-database.service';
import { Notification } from 'src/core/domain/notification/notification.entity';

@Injectable()
export class PgNotificationRetryRepository implements NotificationRetryRepositoryPort {
    constructor(private pg: PgDatabaseService) { }

    async saveForRetry(notification: Notification): Promise<void> {
        const query = `
    UPDATE notifications
    SET status = 'retrying', attempt = $1
    WHERE id = $2;
  `;
        await this.pg.getPool().query(query, [notification.attempt, notification.id]);
    }

    async findPendingRetries(): Promise<Notification[]> {
        const result = await this.pg.getPool().query(
            `SELECT * FROM notifications WHERE status = 'retrying' AND attempt < 3`,
        );
        return result.rows.map(row => this.mapRowToNotification(row));
    }

    async markAsProcessed(id: string): Promise<void> {
        const query = `
      UPDATE notifications
      SET status = 'sent'
      WHERE id = $1;
    `;
        await this.pg.getPool().query(query, [id]);
    }

    private mapRowToNotification(row: any): Notification {
        const notification = new Notification(
            row.id,
            row.user_id,
            row.channel as any,
            row.title,
            row.body,
            row.payload ? JSON.parse(row.payload) : undefined,
            row.status as any,
            new Date(row.created_at),
            row.sent_at ? new Date(row.sent_at) : undefined,
            row.attempt,
        );
        return notification;
    }
}