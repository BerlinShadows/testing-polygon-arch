import { LoggingService } from '../application/logging/services/logging.service';
import { ConsoleLoggerAdapter } from '../infrastructure-adapters/console-logger.adapter';

async function run() {
    console.log('[CORE:LOGGING] Running LOGGING scenario...\n');

    const logger = new ConsoleLoggerAdapter();
    const logging = new LoggingService(logger);

    logging.debug('This is a debug message', 'LoggingScenario', { detail: 'verbose' });
    logging.info('This is an info message', 'LoggingScenario');
    logging.warn('This is a warning', 'LoggingScenario', { reason: 'deprecated' });
    logging.error('This is an error', 'LoggingScenario', { code: 500 });

    console.log('[CORE:LOGGING] Logging scenario finished.');
}

run().catch(err => {
    console.error('[CORE:LOGGING] Logging scenario failed:', err);
    process.exit(1);
});