import { User } from '../../../domain/user/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserNotFoundError } from '../../../domain/user/user.errors';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(id: string, name: string, email: string, roles: string[]): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError(id);
        }

        if (user.email !== email) {
            const existing = await this.userRepository.findByEmail(email);
            if (existing) {
                throw new Error(`Email ${email} is already taken`);
            }
        }

        user.updateProfile(name, email, roles);
        return this.userRepository.update(user);
    }
}