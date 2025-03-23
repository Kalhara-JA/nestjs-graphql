import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type LegalDataDocument = LegalData & Document;

@Schema()
@ObjectType()
export class LegalData {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true })
  @Field()
  personType: string;

  @Prop({ required: true })
  @Field()
  documentType: string;

  @Prop({ required: true })
  @Field()
  documentNumber: string;
}

export const LegalDataSchema = SchemaFactory.createForClass(LegalData);
