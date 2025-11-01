import { Module } from '@nestjs/common';

import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { UserHttpModule } from 'src/infrastructure/interfaces/http/user/user.http.module';
import { UserGraphQLModule } from 'src/infrastructure/interfaces/graphql/user/user.graphql.module';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';
import { WebsocketModule } from 'src/infrastructure/interfaces/websocket/websocket.module';

@Module({
    imports: [
        CoreModule,
        ConfigModule,
        DatabaseModule,
        WebsocketModule,
        UserHttpModule,
        UserGraphQLModule,
    ],
})
export class AppModule { }