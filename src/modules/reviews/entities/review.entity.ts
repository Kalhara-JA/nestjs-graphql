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
  @Field()
  productId: string;

  @Prop({ required: true })
  @Field()
  userId: string;

  @Prop({ required: true })
  @Field()
  categoryId: string;

  @Prop({ required: true })
  @Field()
  subCategoryId: string;

  @Prop({ required: true })
  @Field()
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
