import { LogAuditEventUseCase } from "../application/audit/use-cases/log-audit-event.use-case";
import { LoggingService } from "../application/logging/services/logging.service";
import { AuditEventFactory } from "../domain/audit/audit-event.factory";
import { ConsoleLoggerAdapter } from "../infrastructure-adapters/console-logger.adapter";
import { InMemoryAuditRepository } from "../infrastructure-adapters/in-memory-audit-repository";


async function run() {
    console.log('Running AUDIT scenario...\n');

    const logger = new ConsoleLoggerAdapter();
    const logging = new LoggingService(logger);

    const repo = new InMemoryAuditRepository();
    const useCase = new LogAuditEventUseCase(repo);

    logging.info('Starting audit scenario', 'AuditScenario');

    const event = AuditEventFactory.userLogin(
        'user-789',
        '192.168.1.100',
        'Mozilla/5.0'
    );

    await useCase.execute(event);

    logging.info('Audit scenario completed', 'AuditScenario');
    console.log('\n Audit scenario finished.');
}

run().catch(err => {
    console.error(' Audit scenario failed:', err);
    process.exit(1);
});