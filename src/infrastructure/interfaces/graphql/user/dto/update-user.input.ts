import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: string[];
}
