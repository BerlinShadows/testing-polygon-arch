import { PaginatedResult, PaginationOptions } from 'src/shared/types/pagination.types';
import { User } from '../../../domain/user/user.entity';
import { UserFilters } from 'src/core/domain/user/user.filters';

export abstract class UserRepositoryPort {
  abstract create(user: User): Promise<User>;
  abstract findAll(options: PaginationOptions, filters?: UserFilters): Promise<PaginatedResult<User>>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
