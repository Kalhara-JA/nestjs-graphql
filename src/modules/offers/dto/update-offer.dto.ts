import { Field, Float, ArgsType, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsBoolean, IsArray } from 'class-validator';

@InputType()
@ArgsType()
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

  @Prop({ type: Date })
  @Field(() => String, { nullable: true })
  @IsOptional()
  expirationDate?: Date;
}
