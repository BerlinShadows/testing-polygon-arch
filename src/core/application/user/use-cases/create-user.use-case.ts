import { User } from 'src/core/domain/user/user.entity';
import { UserAlreadyExistsError } from 'src/core/domain/user/user.errors';
import { UserRepositoryPort } from '../ports/user.repository.port';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(email: string, name: string, roles: string[]): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError(email);
    }

    const user = new User('user-' + Date.now(), email, name, roles);

    return this.userRepository.create(user);
  }
}
