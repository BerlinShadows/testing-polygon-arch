import { Module } from '@nestjs/common';

import { UserResolver } from './user.resolver';
import { UserUseCasesModule } from 'src/infrastructure/application/user/user-use-cases.module';

@Module({
  imports: [UserUseCasesModule],
  providers: [UserResolver],
})
export class UserGraphQLModule {}
