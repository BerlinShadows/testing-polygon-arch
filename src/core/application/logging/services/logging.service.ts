import { LogEntry, LogLevel } from '../../../domain/logging/log-entry.entity';
import { LoggerPort } from '../ports/logger.port';

export class LoggingService {
    constructor(private readonly logger: LoggerPort) { }

    debug(message: string, context?: string, metadata?: Record<string, any>): void {
        this.log('debug', message, context, metadata);
    }

    info(message: string, context?: string, metadata?: Record<string, any>): void {
        this.log('info', message, context, metadata);
    }

    warn(message: string, context?: string, metadata?: Record<string, any>): void {
        this.log('warn', message, context, metadata);
    }

    error(message: string, context?: string, metadata?: Record<string, any>): void {
        this.log('error', message, context, metadata);
    }

    private log(
        level: LogLevel,
        message: string,
        context?: string,
        metadata?: Record<string, any>,
    ): void {
        const entry = new LogEntry(level, message, context, new Date(), metadata);
        this.logger.log(entry);
    }
}