// src/provider/providers-response.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Provider } from './provider.entity';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProvidersResponseDocument = ProvidersResponse & Document;

@Schema()
@ObjectType()
export class ProvidersResponse {
  @Field(() => [Provider], { nullable: true })
  providers: Provider[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}

export const ProvidersResponseSchema =
  SchemaFactory.createForClass(ProvidersResponse);
