import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateBookingStatusDto {
  @Field()
  @IsNotEmpty()
  status: string;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;
}
