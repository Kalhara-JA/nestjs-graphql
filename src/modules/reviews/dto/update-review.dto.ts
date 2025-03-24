import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class UpdateReviewDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}
