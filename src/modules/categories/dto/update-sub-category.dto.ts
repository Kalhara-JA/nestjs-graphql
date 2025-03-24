import { Field, ArgsType, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class UpdateSubCategoryDto {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  color?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  categoryId?: string;
}
