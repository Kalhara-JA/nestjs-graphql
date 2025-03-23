import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { SubCategory } from './sub-category.entity';

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

  @Field(() => [SubCategory], { nullable: true })
  subCategories: SubCategory[];
}

export const ServiceCategorySchema =
  SchemaFactory.createForClass(ServiceCategory);
