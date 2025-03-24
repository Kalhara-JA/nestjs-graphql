import { Field, Float, Int, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class CreateProductDto {
  @Field(() => ID)
  @IsNotEmpty()
  providerId: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  image: string;

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

  @Field(() => ID)
  @IsNotEmpty()
  mainCategory: string;

  @Field(() => ID)
  @IsNotEmpty()
  subCategory: string;

  @Field({ nullable: true })
  @IsOptional()
  includeSupplies: boolean;

  @Field({ nullable: true })
  @IsOptional()
  includeTools: boolean;
}
