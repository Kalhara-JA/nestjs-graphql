import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@InputType()
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
