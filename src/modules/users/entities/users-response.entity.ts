// src/user/users-response.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UsersResponse {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalCount: number;
}
