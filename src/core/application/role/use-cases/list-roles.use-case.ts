import { Role } from 'src/core/domain/role/role.entity';
import { RoleRepositoryPort } from '../ports/role.repository.port';

export class ListRolesUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) { }

    async execute(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }
}