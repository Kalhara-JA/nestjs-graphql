// src/review/review-details.type.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReviewDetailsDocument = ReviewDetails & Document;
@Schema()
@ObjectType()
export class ReviewDetails {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field()
  date: string;

  @Field(() => User)
  user: User;

  @Field()
  category: string;

  @Field()
  subCategory: string;

  @Field(() => Provider)
  provider: Provider;

  @Field(() => Int)
  servicesCount: number;
}

export const ReviewDetailsSchema = SchemaFactory.createForClass(ReviewDetails);
