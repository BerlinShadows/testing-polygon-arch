import { User } from 'src/core/domain/user/user.entity';
import { UserAlreadyExistsError } from 'src/core/domain/user/user.errors';
import { RoleNotFoundError } from 'src/core/domain/role/role.errors';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { RoleRepositoryPort } from '../../role/ports/role.repository.port';
import { SendNotificationUseCase } from '../../notification/use-cases/send-notification.use-case';
import { generate } from 'src/core/services/id-generator.service';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly roleRepository: RoleRepositoryPort,
    private readonly sendNotificationUseCase: SendNotificationUseCase,
  ) { }

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

    const user = new User(
      generate('user'),
      email,
      name,
      roles
    );

    const savedUser = await this.userRepository.create(user);

    await this.sendNotificationUseCase.execute(
      savedUser.id,
      'websocket',
      'Новый пользователь создан',
      `Пользователь ${name} (${email}) зарегистрирован с ролями: ${roles.join(', ')}`,
      {
        userId: savedUser.id,
        email: savedUser.email,
        roles: savedUser.roles,
      }
    );

    return savedUser;
  }
}
