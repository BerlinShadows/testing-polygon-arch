import { Module } from '@nestjs/common';

import { RoleResolver } from './role.resolver';
import { RoleUseCasesModule } from 'src/infrastructure/application/role/role-use-cases.module';

@Module({
  imports: [RoleUseCasesModule],
  providers: [RoleResolver],
})
export class RoleGraphQLModule {}
