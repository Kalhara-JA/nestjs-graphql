import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type SubCategoryDocument = SubCategory & Document;

@Schema()
@ObjectType()
export class SubCategory {
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

  @Prop({ required: true })
  @Field(() => ID)
  categoryId: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
