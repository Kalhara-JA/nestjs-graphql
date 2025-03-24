// src/user/users-response.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersResponseDocument = UsersResponse & Document;

@Schema()
@ObjectType()
export class UsersResponse {
  @Field(() => [User], { nullable: 'itemsAndList' })
  users: User[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}

export const UsersResponseSchema = SchemaFactory.createForClass(UsersResponse);
