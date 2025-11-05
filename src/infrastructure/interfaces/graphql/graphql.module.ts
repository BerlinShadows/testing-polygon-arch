import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserGraphQLModule } from './user/user.graphql.module';
import { RoleGraphQLModule } from './role/role.graphql.module';
import { TestGraphQLModule } from './test/test.graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: 'clean-schema.gql',
      sortSchema: true,
      graphiql: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    UserGraphQLModule,
    RoleGraphQLModule,
    //
    TestGraphQLModule,
  ],
})
export class GraphqlModule {}
