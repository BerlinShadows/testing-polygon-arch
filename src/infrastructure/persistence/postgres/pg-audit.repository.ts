import { Injectable } from '@nestjs/common';
import { AuditEvent } from '../../../core/domain/audit/audit-event.entity';
import { AuditRepositoryPort } from '../../../core/application/audit/ports/audit-repository.port';
import { PgDatabaseService } from '../database/pg-database.service';
import { generate } from 'src/core/services/id-generator.service';

@Injectable()
export class PgAuditRepository implements AuditRepositoryPort {
  constructor(private pg: PgDatabaseService) {}

  async save(event: AuditEvent): Promise<void> {
    const query = `
      INSERT INTO audit_events (id, provider_id, event_type, payload, created_at)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const values = [
      generate('audit'),
      event.providerId,
      event.eventType,
      JSON.stringify(event.payload),
      event.timestamp,
    ];

    await this.pg.getPool().query(query, values);
  }

  async findByProvider(providerId: string, limit = 10): Promise<AuditEvent[]> {
    const result = await this.pg.getPool().query(
      `SELECT * FROM audit_events 
       WHERE provider_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [providerId, limit],
    );
    return result.rows.map((row) => this.mapRowToAuditEvent(row));
  }

  private mapRowToAuditEvent(row: any): AuditEvent {
    return new AuditEvent(
      row.id,
      row.provider_id,
      row.event_type,
      JSON.parse(row.payload),
      new Date(row.created_at),
    );
  }
}
