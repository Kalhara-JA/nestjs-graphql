import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UpdateBookingTypeDto {
  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  newPrice: string;
}
