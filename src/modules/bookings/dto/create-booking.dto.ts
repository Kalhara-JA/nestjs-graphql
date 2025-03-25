import { Field, ArgsType, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
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

  @Prop({ type: Date })
  @Field(() => String)
  @IsNotEmpty()
  date: Date;

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
