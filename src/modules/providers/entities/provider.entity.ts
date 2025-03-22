import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';

export type ProviderDocument = Provider & Document;

@Schema()
@ObjectType()
export class Provider {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  phone: string;

  @Prop({ required: true })
  @Field()
  image: string;

  @Prop({ required: true })
  @Field()
  firebaseId: string;

  @Prop()
  @Field({ nullable: true })
  fcmToken?: string;

  @Prop()
  @Field(() => Float, { nullable: true })
  rating?: number;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
