import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type LegalDataDocument = LegalData & Document;

@Schema()
@ObjectType()
export class LegalData {
  @Field(() => ID)
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true, enum: ['natural'] })
  @Field()
  personType: string;

  @Prop({
    required: true,
    enum: ['Cedula de Ciudadanía', 'Pasaporte', 'Cedula de Extranjería'],
  })
  @Field()
  documentType: string;

  @Prop({ required: true })
  @Field()
  documentNumber: string;
}

export const LegalDataSchema = SchemaFactory.createForClass(LegalData);
