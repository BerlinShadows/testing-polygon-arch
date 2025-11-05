import { Module } from '@nestjs/common';

import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { CreateRoleUseCase } from 'src/core/application/role/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from 'src/core/application/role/use-cases/delete-role.use-case';
import { GetRoleUseCase } from 'src/core/application/role/use-cases/get-role.use-case';
import { ListRolesUseCase } from 'src/core/application/role/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from 'src/core/application/role/use-cases/update-role.use-case';
import { CoreModule } from 'src/core/core.module';
import { IdGeneratorService } from 'src/core/services/id-generator.service';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';

@Module({
    imports: [CoreModule, DatabaseModule],
    providers: [
        {
            provide: CreateRoleUseCase,
            useFactory: (
                repo: RoleRepositoryPort,
                idGen: IdGeneratorService
            ) => new CreateRoleUseCase(repo, idGen),
            inject: [RoleRepositoryPort, IdGeneratorService],
        },
        {
            provide: GetRoleUseCase,
            useFactory: (repo: RoleRepositoryPort) => new GetRoleUseCase(repo),
            inject: [RoleRepositoryPort],
        },
        {
            provide: UpdateRoleUseCase,
            useFactory: (repo: RoleRepositoryPort) => new UpdateRoleUseCase(repo),
            inject: [RoleRepositoryPort],
        },
        {
            provide: DeleteRoleUseCase,
            useFactory: (repo: RoleRepositoryPort) => new DeleteRoleUseCase(repo),
            inject: [RoleRepositoryPort],
        },
        {
            provide: ListRolesUseCase,
            useFactory: (repo: RoleRepositoryPort) => new ListRolesUseCase(repo),
            inject: [RoleRepositoryPort],
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
