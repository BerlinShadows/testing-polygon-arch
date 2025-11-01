import { Module } from '@nestjs/common';

import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';
import { PgUserRepository } from 'src/infrastructure/persistence/postgres/pg-user.repository';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepositoryPort,
      useClass: PgUserRepository,
    },
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserUseCasesModule {}
