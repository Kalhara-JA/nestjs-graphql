import { Field, Float, Int, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsBoolean } from 'class-validator';

@ArgsType()
export class UpdateProductDto {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  rate?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  rating?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  jobs?: number;

  @Field({ nullable: true })
  @IsOptional()
  mainCategory?: string;

  @Field({ nullable: true })
  @IsOptional()
  subCategory?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  includeSupplies?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  includeTools?: boolean;
}
