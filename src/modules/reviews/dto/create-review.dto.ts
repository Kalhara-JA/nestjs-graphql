import { Field, Float, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class CreateReviewDto {
  @Field(() => ID)
  @IsNotEmpty()
  productId: string;

  @Field(() => ID)
  @IsNotEmpty()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  categoryId: string;

  @Field(() => ID)
  @IsNotEmpty()
  subCategoryId: string;

  @Field(() => ID)
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
