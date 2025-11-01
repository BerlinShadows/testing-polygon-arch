import { Role } from 'src/core/domain/role/role.entity';
import { RoleNotFoundError } from 'src/core/domain/role/role.errors';
import { RoleRepositoryPort } from '../ports/role.repository.port';

export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepositoryPort) {}

  async execute(id: string, name: string, description: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundError(id);
    }

    if (role.name !== name) {
      const existing = await this.roleRepository.findByName(name);
      if (existing) {
        throw new Error(`Role with name ${name} already exists`);
      }
    }

    role.name = name;
    role.description = description;

    return this.roleRepository.update(role);
  }
}
