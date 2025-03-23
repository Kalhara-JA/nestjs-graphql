import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

export type ReviewDocument = Review & Document;

@Schema()
@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field(() => ID)
  productId: string;

  @Prop({ required: false })
  @Field(() => ID, { nullable: true })
  providerId: string;

  @Prop({ required: true })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true })
  @Field(() => ID)
  categoryId: string;

  @Prop({ required: true })
  @Field(() => ID)
  subCategoryId: string;

  @Prop({ required: true })
  @Field(() => ID)
  bookingId: string;

  @Prop({ required: true })
  @Field(() => Float)
  rating: number;

  @Prop({ required: true })
  @Field()
  comment: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  @Field()
  date: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
