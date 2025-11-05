import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';
import { ListUsersUseCase } from 'src/core/application/user/use-cases/list-users.use-case';
import { PaginatedUser } from './types/paginated-user.type';
import { PaginationInput } from './dto/pagination.input';
import { UserFiltersInput } from './dto/user-filters.input';
import { UserFilters } from 'src/core/domain/user/user.filters';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
    ) { }

    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput): Promise<User> {
        const user = await this.createUserUseCase.execute(
            input.email,
            input.name,
            input.roles,
        );
        return user as User;
    }

    @Query(() => User)
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.getUserUseCase.execute(id);
        return user as User;
    }

    @Query(() => PaginatedUser)
    async users(
        @Args('pagination', { nullable: true }) pagination: PaginationInput = { page: 1, limit: 10 },
        @Args('filters', { nullable: true }) filters: UserFiltersInput = {},
    ): Promise<PaginatedUser> {
        const result = await this.listUsersUseCase.execute(
            { page: pagination.page, limit: pagination.limit },
            filters as UserFilters,
        );
        return result as PaginatedUser;
    }

    @Mutation(() => User)
    async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
        const user = await this.updateUserUseCase.execute(
            input.id,
            input.name,
            input.email,
            input.roles,
        );
        return user as User;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: string): Promise<boolean> {
        await this.deleteUserUseCase.execute(id);
        return true;
    }
}
