import { Module } from '@nestjs/common';

import { UserHttpModule } from './user/user.http.module';
import { RoleHttpModule } from './role/role.http.module';
import { ScenarioHttpModule } from './scenario/scenario.http.module';

@Module({
  imports: [UserHttpModule, RoleHttpModule, ScenarioHttpModule],
})
export class HttpModule { }
