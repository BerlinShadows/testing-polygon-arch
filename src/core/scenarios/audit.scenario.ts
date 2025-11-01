import { LogAuditEventUseCase } from '../application/audit/use-cases/log-audit-event.use-case';
import { AuditEvent } from '../domain/audit/audit-event.entity';
import { InMemoryAuditRepository } from '../infrastructure-adapters/in-memory-audit-repository';
import { LoggingService } from '../application/logging/services/logging.service';
import { ConsoleLoggerAdapter } from '../infrastructure-adapters/console-logger.adapter';

async function run() {
    console.log('[CORE:AUDIT] Running AUDIT scenario...\n');

    const logger = new ConsoleLoggerAdapter();
    const logging = new LoggingService(logger);

    const repo = new InMemoryAuditRepository();
    const useCase = new LogAuditEventUseCase(repo);

    logging.info('Starting audit scenario', 'AuditScenario');

    const event = new AuditEvent(
        'audit-' + Date.now(),
        'scenario-demo',
        'user_action',
        { action: 'login', userId: 'user-789' }
    );

    await useCase.execute(event);

    logging.info('Audit scenario completed', 'AuditScenario');
    console.log('[CORE:AUDIT] scenario finished.');
}

run().catch(err => {
    console.error('[CORE:AUDIT] Audit scenario failed:', err);
    process.exit(1);
});