import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
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

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;
}
