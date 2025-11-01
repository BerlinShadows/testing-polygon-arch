import { AuditEvent } from '../../../domain/audit/audit-event.entity';
import { AuditRepositoryPort } from '../ports/audit-repository.port';

export class LogAuditEventUseCase {
    constructor(private readonly repository: AuditRepositoryPort) { }

    async execute(event: AuditEvent): Promise<void> {
        if (!event.providerId) {
            throw new Error('AuditEvent: providerId is required');
        }
        await this.repository.save(event);
    }
}