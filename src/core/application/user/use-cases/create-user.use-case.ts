import { User } from '../../../domain/user/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserAlreadyExistsError } from '../../../domain/user/user.errors';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(email: string, name: string, role: string): Promise<User> {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new UserAlreadyExistsError(email);
        }

        const user = new User(
            'user-' + Date.now(),
            email,
            name,
            role
        );

        return this.userRepository.create(user);
    }
}