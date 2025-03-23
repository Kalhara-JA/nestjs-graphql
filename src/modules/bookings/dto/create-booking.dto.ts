import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class CreateBookingDto {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  providerId: string;

  @Field()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNotEmpty()
  date: string;

  @Field()
  @IsNotEmpty()
  time: string;

  @Field()
  @IsNotEmpty()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  hours?: string;

  @Field({ nullable: true })
  @IsOptional()
  type?: string;
}
