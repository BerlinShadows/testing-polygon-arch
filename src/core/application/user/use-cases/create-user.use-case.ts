import { User } from 'src/core/domain/user/user.entity';
import { UserAlreadyExistsError } from 'src/core/domain/user/user.errors';
import { RoleNotFoundError } from 'src/core/domain/role/role.errors';
import { generate } from 'src/shared/utills/id-generator';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { RoleRepositoryPort } from '../../role/ports/role.repository.port';
import { SendNotificationUseCase } from '../../notification/use-cases/send-notification.use-case';
import { SendMessageUseCase } from '../../messaging/use-cases/send-message.use-case';
import { NotificationMessage } from 'src/shared/types/message.types';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly roleRepository: RoleRepositoryPort,
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    // private readonly sendMessageUseCase: SendMessageUseCase,
  ) {}

  async execute(email: string, name: string, roles: string[]): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError(email);
    }

    for (const roleName of roles) {
      const role = await this.roleRepository.findByName(roleName);
      if (!role) {
        throw new RoleNotFoundError(roleName);
      }
    }

    const user = new User(generate('user'), email, name, roles);

    const savedUser = await this.userRepository.create(user);

    const notification = await this.sendNotificationUseCase.execute(
      savedUser.id,
      'websocket',
      'Новый пользователь создан',
      `Пользователь ${name} (${email}) зарегистрирован с ролями: ${roles.join(', ')}`,
      {
        userId: savedUser.id,
        email: savedUser.email,
        roles: savedUser.roles,
      },
    );

    const message: NotificationMessage = {
      id: notification.id,
      userId: notification.userId,
      channel: notification.channel,
      title: notification.title,
      body: notification.body,
      payload: notification.payload,
      timestamp: notification.createdAt.toISOString(),
      eventType: 'notification_created',
    };

    // await this.sendMessageUseCase.execute('notifications', message);

    return savedUser;
  }
}
