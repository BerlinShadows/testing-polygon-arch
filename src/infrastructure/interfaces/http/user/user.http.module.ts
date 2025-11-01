import { Module } from '@nestjs/common';

import { UserUseCasesModule } from 'src/infrastructure/application/user/user-use-cases.module';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    imports: [UserUseCasesModule]
})
export class UserHttpModule { }