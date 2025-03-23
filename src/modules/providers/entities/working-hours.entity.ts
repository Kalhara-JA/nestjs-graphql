// src/provider/working-hours.type.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkingHoursDocument = WorkingHours & Document;

@Schema()
@ObjectType()
export class WorkingHours {
  @Field()
  startTime: string;

  @Field()
  endTime: string;
}

export const WorkingHoursSchema = SchemaFactory.createForClass(WorkingHours);
