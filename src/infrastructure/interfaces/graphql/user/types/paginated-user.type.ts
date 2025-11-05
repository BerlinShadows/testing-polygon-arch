import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class PaginatedUser {
  @Field(() => [User])
  data: User[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
