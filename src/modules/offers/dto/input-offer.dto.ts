import { InputType, Field, Float, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

@ArgsType()
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

  @Field(() => [ID], { nullable: true })
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
