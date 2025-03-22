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

  @Field(() => Provider)
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

  @Field(() => Int, { nullable: true })
  discount?: number;

  @Field(() => ServiceCategory)
  mainCategory: ServiceCategory;

  @Field(() => SubCategory)
  subCategory: SubCategory;

  @Field()
  includeSupplies: boolean;

  @Field()
  includeTools: boolean;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
