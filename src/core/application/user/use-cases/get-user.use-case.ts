import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserNotFoundError } from '../../../domain/user/user.errors';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }
}
