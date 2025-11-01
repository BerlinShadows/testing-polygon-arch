import { LogEntry } from '../../../domain/logging/log-entry.entity';

export abstract class LoggerPort {
  abstract log(entry: LogEntry): void | Promise<void>;
}
