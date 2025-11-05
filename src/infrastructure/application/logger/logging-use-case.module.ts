import { Module } from '@nestjs/common';

import { LoggerPort } from 'src/core/application/logging/ports/logger.port';
import { LoggingService } from 'src/core/application/logging/services/logging.service';
import { ConsoleLoggerAdapter } from 'src/core/infrastructure-adapters/console-logger.adapter';

@Module({
    providers: [
        {
            provide: LoggerPort,
            useClass: ConsoleLoggerAdapter,
        },
        {
            provide: LoggingService,
            useFactory: (logger: LoggerPort) => new LoggingService(logger),
            inject: [LoggerPort],
        },
    ],
    exports: [LoggingService],
})
export class LoggingModule { }