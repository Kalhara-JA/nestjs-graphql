// src/user/users-response.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersResponseDocument = UsersResponse & Document;

@Schema()
@ObjectType()
export class UsersResponse {
  @Field(() => [User], { nullable: false })
  users: User[];

  @Field(() => Int, { nullable: false })
  totalCount: number;
}

export const UsersResponseSchema = SchemaFactory.createForClass(UsersResponse);
