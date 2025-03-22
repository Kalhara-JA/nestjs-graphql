import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateBookingStatusDto {
  @Field()
  @IsNotEmpty()
  status: string;

  @Field({ nullable: true })
  @IsOptional()
  notes?: string;
}
