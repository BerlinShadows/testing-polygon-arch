import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserResolver } from './user.resolver';
import { UserUseCasesModule } from 'src/infrastructure/application/user/user-use-cases.module';


@Module({
    imports: [
        UserUseCasesModule,
    ],
    providers: [
        UserResolver,
    ],
})
export class UserGraphQLModule { }