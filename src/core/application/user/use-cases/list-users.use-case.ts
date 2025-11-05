import { PaginatedResult, PaginationOptions } from 'src/shared/types/pagination.types';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';
import { UserFilters } from 'src/core/domain/user/user.filters';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) { }

  async execute(
    options: PaginationOptions,
    filters: UserFilters = {},
  ): Promise<PaginatedResult<User>> {
    return this.userRepository.findAll(options, filters);
  }
}
