import { LoggerPort } from '../application/logging/ports/logger.port';
import { LogEntry } from '../domain/logging/log-entry.entity';

export class ConsoleLoggerAdapter implements LoggerPort {
  log(entry: LogEntry): void {
    const ts = entry.timestamp.toISOString().replace('T', ' ').substring(0, 19);
    console.log(
      `[${ts}] ${entry.level.toUpperCase()} [${entry.context || 'CORE'}]: ${entry.message}`,
    );
    if (entry.metadata) {
      console.log('  Meta:', JSON.stringify(entry.metadata, null, 2));
    }
  }
}
