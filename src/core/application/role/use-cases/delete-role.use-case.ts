import { RoleNotFoundError } from 'src/core/domain/role/role.errors';
import { RoleRepositoryPort } from '../ports/role.repository.port';

export class DeleteRoleUseCase {
    constructor(private readonly roleRepository: RoleRepositoryPort) { }

    async execute(id: string): Promise<void> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new RoleNotFoundError(id);
        }
        await this.roleRepository.delete(id);
    }
}