import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Role } from './role.entity';
import { CreateRoleUseCase } from 'src/core/application/role/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from 'src/core/application/role/use-cases/delete-role.use-case';
import { GetRoleUseCase } from 'src/core/application/role/use-cases/get-role.use-case';
import { ListRolesUseCase } from 'src/core/application/role/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from 'src/core/application/role/use-cases/update-role.use-case';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RoleResolver {
    constructor(
        private readonly createRoleUseCase: CreateRoleUseCase,
        private readonly getRoleUseCase: GetRoleUseCase,
        private readonly updateRoleUseCase: UpdateRoleUseCase,
        private readonly deleteRoleUseCase: DeleteRoleUseCase,
        private readonly listRolesUseCase: ListRolesUseCase,
    ) { }

    @Mutation(() => Role)
    async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
        const role = await this.createRoleUseCase.execute(input.name, input.description);
        return role as Role;
    }

    @Query(() => Role)
    async role(@Args('id') id: string): Promise<Role> {
        const role = await this.getRoleUseCase.execute(id);
        return role as Role;
    }

    @Mutation(() => Role)
    async updateRole(@Args('input') input: UpdateRoleInput): Promise<Role> {
        const role = await this.updateRoleUseCase.execute(input.id, input.name, input.description);
        return role as Role;
    }

    @Mutation(() => Boolean)
    async deleteRole(@Args('id') id: string): Promise<boolean> {
        await this.deleteRoleUseCase.execute(id);
        return true;
    }

    @Query(() => [Role])
    async roles(): Promise<Role[]> {
        const roles = await this.listRolesUseCase.execute();
        return roles as Role[];
    }
}