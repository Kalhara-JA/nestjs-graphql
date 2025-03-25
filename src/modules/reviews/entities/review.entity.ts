import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

export type ReviewDocument = Review & Document;

@Schema()
@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
  @Field(() => ID)
  productId: string;

  @Prop({ required: false, type: Types.ObjectId, ref: 'Provider' })
  @Field(() => ID, { nullable: true })
  providerId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'ServiceCategory' })
  @Field(() => ID)
  categoryId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'SubCategory' })
  @Field(() => ID)
  subCategoryId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Booking' })
  @Field(() => ID)
  bookingId: string;

  @Prop({ required: true })
  @Field(() => Float)
  rating: number;

  @Prop({ required: true })
  @Field()
  comment: string;

  @Prop({ required: true, type: Date })
  @Field(() => String)
  date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
