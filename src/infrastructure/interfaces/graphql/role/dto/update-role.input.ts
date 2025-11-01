import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;
}