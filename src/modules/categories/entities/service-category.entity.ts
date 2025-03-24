import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { SubCategory } from './sub-category.entity';

export type ServiceCategoryDocument = ServiceCategory & Document;

@Schema()
@ObjectType()
export class ServiceCategory {
  @Field(() => ID, { nullable: true })
  id: string;

  @Prop()
  @Field({ nullable: true })
  title: string;

  @Prop()
  @Field({ nullable: true })
  image: string;

  @Prop()
  @Field({ nullable: true })
  color: string;

  @Field(() => [SubCategory], { nullable: 'itemsAndList' })
  subCategories: SubCategory[];
}

export const ServiceCategorySchema =
  SchemaFactory.createForClass(ServiceCategory);
