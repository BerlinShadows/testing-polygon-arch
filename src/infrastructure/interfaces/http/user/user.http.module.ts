import { Module } from '@nestjs/common';

import { UserController } from './user.controller';

import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { InMemoryUserRepository } from 'src/infrastructure/persistence/in-memory/in-memory-user.repository';

@Module({
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        {
            provide: 'UserRepository',
            useClass: InMemoryUserRepository,
        },
    ],
})
export class UserHttpModule { }