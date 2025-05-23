// src/favorite-product/favorite-product.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type FavoriteProductDocument = FavoriteProduct & Document;

@Schema()
@ObjectType()
export class FavoriteProduct {
  @Field(() => ID)
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Field(() => ID)
  userId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
  @Field(() => ID)
  productId: string;
}

export const FavoriteProductSchema =
  SchemaFactory.createForClass(FavoriteProduct);
