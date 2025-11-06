import { Module } from '@nestjs/common';

import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from 'src/infrastructure/config/config.module';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';
import { WebsocketModule } from 'src/infrastructure/interfaces/websocket/websocket.module';
import { GraphqlModule } from 'src/infrastructure/interfaces/graphql/graphql.module';
import { HttpModule } from 'src/infrastructure/interfaces/http/http.module';
import { MessagingModule } from 'src/infrastructure/messaging/messaging.module';

@Module({
  imports: [
    //
    CoreModule,
    //
    ConfigModule,
    //
    // MessagingModule,
    DatabaseModule,
    WebsocketModule,
    //
    GraphqlModule,
    HttpModule,

  ],
})
export class AppModule {}
