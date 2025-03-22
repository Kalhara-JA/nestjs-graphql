import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsArray } from 'class-validator';

@InputType()
export class UpdateOfferDto {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  subtitle?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  discount?: number;

  @Field({ nullable: true })
  @IsOptional()
  appLink?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  products?: string[];

  @Field({ nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  expirationDate?: string;
}
