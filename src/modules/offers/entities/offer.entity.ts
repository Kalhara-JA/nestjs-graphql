import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

  @Prop({ type: [String], default: [] })
  @Field(() => [Product], { nullable: true })
  products: Product[];

  @Prop({ required: false })
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

  @Prop({ required: true, default: () => new Date().toISOString() })
  @Field()
  creationDate: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  @Field()
  updateDate: string;

  @Prop({ required: true })
  @Field()
  expirationDate: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
