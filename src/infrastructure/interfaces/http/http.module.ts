import { Module } from '@nestjs/common';

import { UserHttpModule } from './user/user.http.module';
import { RoleHttpModule } from './role/role.http.module';

@Module({
  imports: [UserHttpModule, RoleHttpModule],
})
export class HttpModule {}
