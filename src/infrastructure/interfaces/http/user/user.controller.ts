import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
    ParseIntPipe,
    DefaultValuePipe,
    Query,
} from '@nestjs/common';

import { CreateUserUseCase } from 'src/core/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from 'src/core/application/user/use-cases/delete-user.use-case';
import { GetUserUseCase } from 'src/core/application/user/use-cases/get-user.use-case';
import { ListUsersUseCase } from 'src/core/application/user/use-cases/list-users.use-case';
import { UpdateUserUseCase } from 'src/core/application/user/use-cases/update-user.use-case';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
    ) { }

    @Post()
    async create(@Body() dto: { email: string; name: string; roles: string[] }) {
        console.log(dto)
        return this.createUserUseCase.execute(dto.email, dto.name, dto.roles);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.getUserUseCase.execute(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: { name: string; email: string; roles: string[] },
    ) {
        try {
            return await this.updateUserUseCase.execute(
                id,
                dto.name,
                dto.email,
                dto.roles,
            );
        } catch (e) {
            if (e.name === 'UserNotFoundError')
                throw new NotFoundException(e.message);
            throw new Error(e.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.deleteUserUseCase.execute(id);
            return { success: true };
        } catch (e) {
            if (e.name === 'UserNotFoundError')
                throw new NotFoundException(e.message);
            throw e;
        }
    }

    @Get()
    async findAll(
        @Query() query: { page?: string; limit?: string; email?: string; isActive?: string },
    ) {
        const options = {
            page: parseInt(query.page || '1', 10),
            limit: parseInt(query.limit || '10', 10),
        };

        const filters = {
            email: query.email,
            isActive: query.isActive === 'true' ? true : query.isActive === 'false' ? false : undefined,
        };

        return this.listUsersUseCase.execute(options, filters);
    }
}
