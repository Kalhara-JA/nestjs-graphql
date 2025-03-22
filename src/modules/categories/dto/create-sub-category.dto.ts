import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSubCategoryDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  image: string;

  @Field()
  @IsNotEmpty()
  color: string;

  @Field()
  @IsNotEmpty()
  categoryId: string;
}
