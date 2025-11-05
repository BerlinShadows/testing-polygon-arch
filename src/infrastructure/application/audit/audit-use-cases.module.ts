import { Module } from '@nestjs/common';
import { AuditRepositoryPort } from 'src/core/application/audit/ports/audit-repository.port';

import { LogAuditEventUseCase } from 'src/core/application/audit/use-cases/log-audit-event.use-case';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: LogAuditEventUseCase,
      useFactory: (repo: AuditRepositoryPort) => new LogAuditEventUseCase(repo),
      inject: [AuditRepositoryPort],
    },
  ],
  exports: [LogAuditEventUseCase],
})
export class AuditUseCasesModule {}
