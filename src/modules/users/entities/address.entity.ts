import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type AddressDocument = Address & Document;

@Schema()
@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  address: string;

  @Prop({ required: true })
  @Field(() => ID)
  userId: string;

  @Prop()
  @Field({ nullable: true })
  latitude?: string;

  @Prop()
  @Field({ nullable: true })
  longitude?: string;

  @Prop()
  @Field({ nullable: true })
  additional?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
