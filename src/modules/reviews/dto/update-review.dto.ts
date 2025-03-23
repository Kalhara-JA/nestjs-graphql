import { Field, Float, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class UpdateReviewDto {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}
