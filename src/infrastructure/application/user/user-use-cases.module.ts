import { Module } from '@nestjs/common';

import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';
import { PgUserRepository } from 'src/infrastructure/persistence/postgres/pg-user.repository';
import { ListUsersUseCase } from 'src/core/application/user/use-cases/list-users.use-case';
import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { PgRoleRepository } from 'src/infrastructure/persistence/postgres/pg-role.repository';

@Module({
    providers: [
        {
            provide: CreateUserUseCase,
            useFactory: (userRepo: UserRepositoryPort, roleRepo: RoleRepositoryPort) => new CreateUserUseCase(userRepo, roleRepo),
            inject: [UserRepositoryPort, RoleRepositoryPort],
        },
        {
            provide: GetUserUseCase,
            useFactory: (repo: UserRepositoryPort) => new GetUserUseCase(repo),
            inject: [UserRepositoryPort],
        },
        {
            provide: UpdateUserUseCase,
            useFactory: (repo: UserRepositoryPort) => new UpdateUserUseCase(repo),
            inject: [UserRepositoryPort],
        },
        {
            provide: DeleteUserUseCase,
            useFactory: (repo: UserRepositoryPort) => new DeleteUserUseCase(repo),
            inject: [UserRepositoryPort],
        },
        {
            provide: ListUsersUseCase,
            useFactory: (repo: UserRepositoryPort) => new ListUsersUseCase(repo),
            inject: [UserRepositoryPort],
        },
        {
            provide: UserRepositoryPort,
            useClass: PgUserRepository,
        },
        {
            provide: RoleRepositoryPort,
            useClass: PgRoleRepository,
        },
    ],
    exports: [
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        ListUsersUseCase
    ],
})
export class UserUseCasesModule { }
