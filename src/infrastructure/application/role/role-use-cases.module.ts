import { Module } from '@nestjs/common';

import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { CreateRoleUseCase } from 'src/core/application/role/use-cases/create-role.use-case';
import { InMemoryRoleRepository } from 'src/infrastructure/persistence/in-memory/in-memory-role.repository';

@Module({
    providers: [
        CreateRoleUseCase,
        {
            provide: RoleRepositoryPort,
            useClass: InMemoryRoleRepository,
        },
    ],
    exports: [
        CreateRoleUseCase,
    ],
})
export class RoleUseCasesModule { }