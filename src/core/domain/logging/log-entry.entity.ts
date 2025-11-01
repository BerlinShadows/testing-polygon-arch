export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class LogEntry {
    constructor(
        public readonly level: LogLevel,
        public readonly message: string,
        public readonly context?: string,
        public readonly timestamp: Date = new Date(),
        public readonly metadata?: Record<string, any>,
    ) { }
}