import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { Product } from 'src/modules/products/entities/product.entity';
import { ServiceCategory } from 'src/modules/categories/entities/service-category.entity';

export type OfferDocument = Offer & Document;

@Schema()
@ObjectType()
export class Offer {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  subtitle?: string;

  @Prop({ required: true })
  @Field(() => Float)
  discount: number;

  @Prop()
  @Field({ nullable: true })
  appLink?: string;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  @Field(() => [Product], { nullable: 'itemsAndList' })
  products: Product[];

  @Prop({ required: false, type: Types.ObjectId, ref: 'ServiceCategory' })
  @Field(() => ServiceCategory)
  categoryId: ServiceCategory;

  @Prop()
  @Field({ nullable: true })
  image?: string;

  @Prop()
  @Field({ nullable: true })
  imageUrl?: string;

  @Prop({ required: true, default: true })
  @Field()
  isActive: boolean;

  @Prop({ required: true, default: () => new Date().toISOString(), type: Date })
  @Field(() => String)
  creationDate: Date;

  @Prop({ required: true, default: () => new Date().toISOString(), type: Date })
  @Field(() => String)
  updateDate: Date;

  @Prop({ required: true, type: Date })
  @Field(() => String)
  expirationDate: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
