import { Injectable } from '@nestjs/common';

import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { Notification } from 'src/core/domain/notification/notification.entity';
import { PgDatabaseService } from '../database/pg-database.service';

@Injectable()
export class PgNotificationRepository implements NotificationRepositoryPort {
  constructor(private pg: PgDatabaseService) {}

  async save(notification: Notification): Promise<void> {
    const query = `
      INSERT INTO notifications (id, user_id, channel, title, body, payload, status, created_at, sent_at, attempt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        sent_at = EXCLUDED.sent_at;
    `;
    const values = [
      notification.id,
      notification.userId,
      notification.channel,
      notification.title,
      notification.body,
      notification.payload ? JSON.stringify(notification.payload) : null,
      notification.status,
      notification.createdAt,
      notification.sentAt || null,
      notification.attempt || 0,
    ];

    await this.pg.getPool().query(query, values);
  }

  async findById(id: string): Promise<Notification | null> {
    const result = await this.pg
      .getPool()
      .query('SELECT * FROM notifications WHERE id = $1', [id]);
    return result.rows.length
      ? this.mapRowToNotification(result.rows[0])
      : null;
  }

  async findByUserId(userId: string, limit = 10): Promise<Notification[]> {
    const result = await this.pg
      .getPool()
      .query(
        'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
        [userId, limit],
      );
    return result.rows.map((row) => this.mapRowToNotification(row));
  }

  private mapRowToNotification(row: any): Notification {
    return new Notification(
      row.id,
      row.user_id,
      row.channel,
      row.title,
      row.body,
      row.payload ? JSON.parse(row.payload) : undefined,
      row.status,
      new Date(row.created_at),
      row.sent_at ? new Date(row.sent_at) : undefined,
    );
  }
}
