import { AuditEvent } from '../../../domain/audit/audit-event.entity';

export abstract class AuditRepositoryPort {
  abstract save(event: AuditEvent): Promise<void>;
  abstract findByProvider(
    providerId: string,
    limit?: number,
  ): Promise<AuditEvent[]>;
}
