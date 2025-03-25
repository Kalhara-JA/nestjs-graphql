import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type BookingDocument = Booking & Document;

@Schema()
@ObjectType()
export class Booking {
  @Field(() => ID)
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Provider' })
  @Field(() => ID)
  providerId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
  @Field(() => ID)
  productId: string;

  @Prop({ required: true, type: Date })
  @Field(() => String)
  date: Date;

  @Prop({ required: true })
  @Field()
  time: string;

  @Prop({ required: true })
  @Field(() => ID)
  address: string;

  @Prop()
  @Field({ nullable: true })
  bookingNumber?: string;

  @Prop({ required: true, default: 'pending' })
  @Field()
  status: string;

  @Prop()
  @Field({ nullable: true })
  hours?: string;

  @Prop()
  @Field({ nullable: true })
  type?: string;

  @Prop()
  @Field({ nullable: true })
  newPrice?: string;

  @Prop()
  @Field({ nullable: true })
  securityCode?: string;

  @Prop()
  @Field({ nullable: true })
  notes?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
