import { RoleNotFoundError } from 'src/core/domain/role/role.errors';
import { RoleRepositoryPort } from '../ports/role.repository.port';
import { Role } from 'src/core/domain/role/role.entity';

export class GetRoleUseCase {
  constructor(private readonly roleRepository: RoleRepositoryPort) {}

  async execute(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundError(id);
    }
    return role;
  }
}
