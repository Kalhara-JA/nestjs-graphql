import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateReviewDto {
  @Field()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  categoryId: string;

  @Field()
  @IsNotEmpty()
  subCategoryId: string;

  @Field()
  @IsNotEmpty()
  bookingId: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
