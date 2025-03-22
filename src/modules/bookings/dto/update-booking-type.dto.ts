import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBookingTypeDto {
  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  newPrice: string;
}
