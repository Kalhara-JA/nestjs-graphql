import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

@InputType()
export class OfferInput {
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

  @Field(() => [ID], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  products?: string[];

  @Field(() => ID)
  @IsNotEmpty()
  categoryId: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field({ nullable: true })
  @IsBoolean()
  isActive: boolean;

  @Field()
  @IsNotEmpty()
  expirationDate: string;
}
