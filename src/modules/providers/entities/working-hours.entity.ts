// src/provider/working-hours.type.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class WorkingHours {
  @Field()
  startTime: string;

  @Field()
  endTime: string;
}
