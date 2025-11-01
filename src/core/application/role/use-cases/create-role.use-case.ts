import { Role } from '../../../domain/role/role.entity';
import { RoleRepositoryPort } from '../ports/role.repository.port';

export class CreateRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) { }

    async execute(name: string, description: string): Promise<Role> {
        const role = new Role('role-' + Date.now(), name, description);
        return this.roleRepository.create(role);
    }
    // get-role, update-role, delete-role, list-roles
}