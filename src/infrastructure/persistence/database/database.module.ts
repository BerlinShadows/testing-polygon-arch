import { Module, Global } from '@nestjs/common';

import { DatabaseConfigModule } from 'src/infrastructure/config/database-config/database-config.module';
import { PgDatabaseService } from './pg-database.service';
import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { PgNotificationRepository } from '../postgres/pg-notification.repository';
import { PgRoleRepository } from '../postgres/pg-role.repository';
import { PgUserRepository } from '../postgres/pg-user.repository';
import { AuditRepositoryPort } from 'src/core/application/audit/ports/audit-repository.port';
import { PgAuditRepository } from '../postgres/pg-audit.repository';
import { NotificationRetryRepositoryPort } from 'src/core/application/notification/ports/notification-retry-repository.port';
import { PgNotificationRetryRepository } from '../postgres/pg-notification-retry.repository';
import { AbstractScenarioRepositoryPort } from 'src/core/domain/V2/scenario/ports/abstract-scenario-repository.port';
import { PgScenarioRepository } from '../postgres/pg-scenario.repository';

@Global()
@Module({
  imports: [DatabaseConfigModule],
  providers: [
    PgDatabaseService,
    {
      provide: UserRepositoryPort,
      useClass: PgUserRepository,
    },
    {
      provide: RoleRepositoryPort,
      useClass: PgRoleRepository,
    },
    {
      provide: NotificationRepositoryPort,
      useClass: PgNotificationRepository,
    },
    {
      provide: AuditRepositoryPort,
      useClass: PgAuditRepository,
    },
    {
      provide: NotificationRetryRepositoryPort,
      useClass: PgNotificationRetryRepository,
    },
    {
      provide: AbstractScenarioRepositoryPort,
      useClass: PgScenarioRepository,
    },
  ],
  exports: [
    UserRepositoryPort,
    RoleRepositoryPort,
    NotificationRepositoryPort,
    AuditRepositoryPort,
    NotificationRetryRepositoryPort,
    AbstractScenarioRepositoryPort,
  ],
})
export class DatabaseModule { }
