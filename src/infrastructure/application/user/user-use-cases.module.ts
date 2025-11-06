import { Module } from '@nestjs/common';

import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';
import { ListUsersUseCase } from 'src/core/application/user/use-cases/list-users.use-case';
import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';
import { NotificationUseCasesModule } from '../notification/notification-use-cases.module';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';
// import { MessagingModule } from 'src/infrastructure/messaging/messaging.module';
// import { SendMessageUseCase } from 'src/core/application/messaging/use-cases/send-message.use-case';

@Module({
  imports: [NotificationUseCasesModule, DatabaseModule /* MessagingModule */],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepo: UserRepositoryPort,
        roleRepo: RoleRepositoryPort,
        sendNotification: SendNotificationUseCase,
        // sendMessage: SendMessageUseCase,
      ) =>
        new CreateUserUseCase(
          userRepo,
          roleRepo,
          sendNotification /* sendMessage */,
        ),
      inject: [
        UserRepositoryPort,
        RoleRepositoryPort,
        SendNotificationUseCase /* SendMessageUseCase */,
      ],
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
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
  ],
})
export class UserUseCasesModule {}
