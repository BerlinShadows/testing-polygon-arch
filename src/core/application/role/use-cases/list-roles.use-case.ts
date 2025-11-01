import { Role } from 'src/core/domain/role/role.entity';
import { RoleRepositoryPort } from '../ports/role.repository.port';
import { RoleNotFoundError } from 'src/core/domain/role/role.errors';

export class ListRolesUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) { }

    async execute(): Promise<Role[]> {
        try {
            return await this.roleRepository.findAll();
        } catch (error) {
            console.error('Error in roles resolver:', error);
            throw new RoleNotFoundError('');
        }
    }
}
