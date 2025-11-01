import { UserRepositoryPort } from '../ports/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) { }

  async execute(): Promise<User[]> {
    console.log(this)
    return await this.userRepository.findAll();
  }
}
