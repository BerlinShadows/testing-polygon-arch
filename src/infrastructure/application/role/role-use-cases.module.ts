import { Module } from '@nestjs/common';

import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { CreateRoleUseCase } from 'src/core/application/role/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from 'src/core/application/role/use-cases/delete-role.use-case';
import { GetRoleUseCase } from 'src/core/application/role/use-cases/get-role.use-case';
import { ListRolesUseCase } from 'src/core/application/role/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from 'src/core/application/role/use-cases/update-role.use-case';
import { InMemoryRoleRepository } from 'src/infrastructure/persistence/in-memory/in-memory-role.repository';
import { PgRoleRepository } from 'src/infrastructure/persistence/postgres/pg-role.repository';

@Module({
    providers: [
        CreateRoleUseCase,
        GetRoleUseCase,
        UpdateRoleUseCase,
        DeleteRoleUseCase,
        ListRolesUseCase,
        {
            provide: RoleRepositoryPort,
            useClass: PgRoleRepository,
        },
    ],
    exports: [
        CreateRoleUseCase,
        GetRoleUseCase,
        UpdateRoleUseCase,
        DeleteRoleUseCase,
        ListRolesUseCase,
    ],
})
export class RoleUseCasesModule { }
