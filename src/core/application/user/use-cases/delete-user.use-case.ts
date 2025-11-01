import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserNotFoundError } from '../../../domain/user/user.errors';

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError(id);
        }
        await this.userRepository.delete(id);
    }
}