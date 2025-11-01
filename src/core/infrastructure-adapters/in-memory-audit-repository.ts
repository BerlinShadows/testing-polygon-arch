import { AuditRepositoryPort } from '../application/audit/ports/audit-repository.port';
import { AuditEvent } from '../domain/audit/audit-event.entity';

export class InMemoryAuditRepository implements AuditRepositoryPort {
  private events: AuditEvent[] = [];

  async save(event: AuditEvent): Promise<void> {
    this.events.push(event);
    console.log(
      `[AUDIT] Saved: ${JSON.stringify(event.payload)} | ${event.eventType}`,
    );
  }

  async findByProvider(providerId: string, limit = 10): Promise<AuditEvent[]> {
    return this.events
      .filter((e) => e.providerId === providerId)
      .slice(-limit)
      .reverse();
  }
}
