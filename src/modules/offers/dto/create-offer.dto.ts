import { Field, Float, ArgsType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

@ArgsType()
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

  @Prop({ type: Date })
  @Field(() => String)
  @IsNotEmpty()
  expirationDate: Date;
}
