import { User } from 'src/core/domain/user/user.entity';
import { UserAlreadyExistsError } from 'src/core/domain/user/user.errors';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { RoleRepositoryPort } from '../../role/ports/role.repository.port';
import { RoleNotFoundError } from 'src/core/domain/role/role.errors';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly roleRepository: RoleRepositoryPort
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

    const user = new User('user-' + Date.now(), email, name, roles);

    return this.userRepository.create(user);
  }
}
