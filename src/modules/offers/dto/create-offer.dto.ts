import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

@InputType()
export class CreateOfferDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  subtitle?: string;

  @Field(() => Float)
  @IsNotEmpty()
  discount: number;

  @Field({ nullable: true })
  @IsOptional()
  appLink?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  products?: string[];

  @Field()
  @IsNotEmpty()
  categoryId: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field()
  @IsBoolean()
  isActive: boolean;

  @Field()
  @IsNotEmpty()
  expirationDate: string;
}
