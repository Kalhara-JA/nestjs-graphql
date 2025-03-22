import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type ServiceCategoryDocument = ServiceCategory & Document;

@Schema()
@ObjectType()
export class ServiceCategory {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  image: string;

  @Prop({ required: true })
  @Field()
  color: string;
}

export const ServiceCategorySchema =
  SchemaFactory.createForClass(ServiceCategory);
