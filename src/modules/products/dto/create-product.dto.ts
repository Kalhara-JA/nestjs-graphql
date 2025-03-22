import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
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

  @Field({ nullable: true })
  @IsOptional()
  discount?: number;

  @Field()
  @IsNotEmpty()
  mainCategory: string;

  @Field()
  @IsNotEmpty()
  subCategory: string;

  @Field()
  @IsBoolean()
  includeSupplies: boolean;

  @Field()
  @IsBoolean()
  includeTools: boolean;
}
