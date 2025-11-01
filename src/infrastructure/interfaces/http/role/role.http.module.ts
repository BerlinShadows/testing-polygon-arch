import { Module } from '@nestjs/common';

import { RoleController } from './role.controller';
import { RoleUseCasesModule } from 'src/infrastructure/application/role/role-use-cases.module';

@Module({
  imports: [RoleUseCasesModule],
  controllers: [RoleController],
})
export class RoleHttpModule {}
