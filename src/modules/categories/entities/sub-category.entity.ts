import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type SubCategoryDocument = SubCategory & Document;

@Schema()
@ObjectType()
export class SubCategory {
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

  @Prop({ required: true, type: Types.ObjectId, ref: 'ServiceCategory' })
  @Field(() => ID)
  categoryId: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
