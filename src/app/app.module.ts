import { Module } from '@nestjs/common';

import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { UserHttpModule } from 'src/infrastructure/interfaces/http/user/user.http.module';
import { UserGraphQLModule } from 'src/infrastructure/interfaces/graphql/user/user.graphql.module';

@Module({
    imports: [
        CoreModule,
        ConfigModule,
        UserHttpModule,
        UserGraphQLModule,
    ],
})
export class AppModule { }