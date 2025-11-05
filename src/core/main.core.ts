import { LoggingService } from './application/logging/services/logging.service';
import { ConsoleLoggerAdapter } from './infrastructure-adapters/console-logger.adapter';

async function main() {
  const logger = new ConsoleLoggerAdapter();
  const logging = new LoggingService(logger);
  logging.info('Core integrity check passed', 'HealthCheck');
  console.log('[CORE] Core is operational.');
}

main().catch((err) => {
  console.error('[CORE] Core execution failed:', err);
  process.exit(1);
});
