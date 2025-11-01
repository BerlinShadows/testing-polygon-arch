import { Role } from 'src/core/domain/role/role.entity';
import { RoleAlreadyExistsError } from 'src/core/domain/role/role.errors';
import { RoleRepositoryPort } from '../ports/role.repository.port';

export class CreateRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) { }

    async execute(name: string, description: string): Promise<Role> {
        const existing = await this.roleRepository.findByName(name);
        if (existing) {
            throw new RoleAlreadyExistsError(name);
        }

        const role = new Role(
            'role-' + Date.now(),
            name,
            description
        );

        return this.roleRepository.create(role);
    }
}