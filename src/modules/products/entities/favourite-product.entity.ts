// src/favorite-product/favorite-product.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type FavoriteProductDocument = FavoriteProduct & Document;

@Schema()
@ObjectType()
export class FavoriteProduct {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  userId: string;

  @Prop({ required: true })
  @Field()
  productId: string;
}

export const FavoriteProductSchema =
  SchemaFactory.createForClass(FavoriteProduct);
