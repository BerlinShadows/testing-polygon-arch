import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserFiltersInput {
  @Field({ nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
