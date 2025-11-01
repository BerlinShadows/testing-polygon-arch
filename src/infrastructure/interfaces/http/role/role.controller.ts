import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';

import { CreateRoleUseCase } from 'src/core/application/role/use-cases/create-role.use-case';
import { DeleteRoleUseCase } from 'src/core/application/role/use-cases/delete-role.use-case';
import { GetRoleUseCase } from 'src/core/application/role/use-cases/get-role.use-case';
import { ListRolesUseCase } from 'src/core/application/role/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from 'src/core/application/role/use-cases/update-role.use-case';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly listRolesUseCase: ListRolesUseCase,
        private readonly createRoleUseCase: CreateRoleUseCase,
        private readonly getRoleUseCase: GetRoleUseCase,
        private readonly updateRoleUseCase: UpdateRoleUseCase,
        private readonly deleteRoleUseCase: DeleteRoleUseCase,
    ) { }

    @Post()
    async create(@Body() dto: { name: string; description: string }) {
        return this.createRoleUseCase.execute(dto.name, dto.description);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.getRoleUseCase.execute(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: { name: string; description: string },
    ) {
        return this.updateRoleUseCase.execute(id, dto.name, dto.description);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.deleteRoleUseCase.execute(id);
        return { success: true };
    }

    @Get()
    async findAll() {
        return this.listRolesUseCase.execute();
    }
}
