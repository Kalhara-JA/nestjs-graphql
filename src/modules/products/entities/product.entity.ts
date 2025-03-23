import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';

export type ProductDocument = Product & Document;

@Schema()
@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field(() => ID)
  providerId: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  image: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field(() => Float, { nullable: true })
  rate?: number;

  @Prop()
  @Field(() => Float, { nullable: true })
  rating?: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  jobs?: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  discount?: number;

  @Prop({ required: true })
  @Field(() => ID)
  mainCategory: string;

  @Prop({ required: true })
  @Field(() => ID)
  subCategory: string;

  @Prop({ default: false })
  @Field({ nullable: true })
  includeSupplies: boolean;

  @Prop({ default: false })
  @Field({ nullable: true })
  includeTools: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
