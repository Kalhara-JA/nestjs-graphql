// src/provider/provider-preferences.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { WorkingHours } from './working-hours.entity';

export type ProviderPreferencesDocument = ProviderPreferences & Document;

@Schema()
@ObjectType()
export class ProviderPreferences {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Provider' })
  @Field(() => ID)
  providerId: string;

  @Prop({
    type: { startTime: String, endTime: String },
    required: true,
  })
  @Field(() => WorkingHours)
  workingHours: WorkingHours;
}

export const ProviderPreferencesSchema =
  SchemaFactory.createForClass(ProviderPreferences);
