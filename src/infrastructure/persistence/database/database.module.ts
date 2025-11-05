import { Module, Global } from '@nestjs/common';

import { DatabaseConfigModule } from 'src/infrastructure/config/database-config/database-config.module';
import { PgDatabaseService } from './pg-database.service';
import { NotificationRepositoryPort } from 'src/core/application/notification/ports/notification.repository.port';
import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { PgNotificationRepository } from '../postgres/pg-notification.repository';
import { PgRoleRepository } from '../postgres/pg-role.repository';
import { PgUserRepository } from '../postgres/pg-user.repository';

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
        },],
    exports: [
        UserRepositoryPort,
        RoleRepositoryPort,
        NotificationRepositoryPort,
    ],
})
export class DatabaseModule { }
