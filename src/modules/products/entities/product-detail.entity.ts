// src/product/product-detail.type.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Provider } from '../../providers/entities/provider.entity';
import { ServiceCategory } from '../../categories/entities/service-category.entity';
import { SubCategory } from '../../categories/entities/sub-category.entity';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDetailDocument = ProductDetail & Document;

@Schema()
@ObjectType()
export class ProductDetail {
  @Field(() => ID)
  id: string;

  @Field(() => Provider, { nullable: true })
  provider: Provider;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  rate?: number;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => Int, { nullable: true })
  jobs?: number;

  @Field(() => ServiceCategory, { nullable: true })
  mainCategory: ServiceCategory;

  @Field(() => SubCategory, { nullable: true })
  subCategory: SubCategory;

  @Field({ nullable: true })
  includeSupplies: boolean;

  @Field({ nullable: true })
  includeTools: boolean;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
