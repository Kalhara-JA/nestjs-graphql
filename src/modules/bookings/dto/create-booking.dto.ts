import { Field, ArgsType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class CreateBookingDto {
  @Field(() => ID)
  @IsNotEmpty()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  providerId: string;

  @Field(() => ID)
  @IsNotEmpty()
  productId: string;

  @Field(() => ID)
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
