import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { RoleResolver } from './role.resolver';
import { RoleUseCasesModule } from 'src/infrastructure/application/role/role-use-cases.module';

@Module({
    imports: [
        RoleUseCasesModule,
    ],
    providers: [RoleResolver],
})
export class RoleGraphQLModule { }