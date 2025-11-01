import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserGraphQLModule } from './user/user.graphql.module';
import { RoleGraphQLModule } from './role/role.graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'clean-schema.gql',
      sortSchema: true,
    }),
    UserGraphQLModule,
    RoleGraphQLModule,
  ],
})
export class GraphqlModule {}
