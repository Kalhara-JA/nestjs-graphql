// src/provider/providers-response.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Provider } from './provider.entity';

@ObjectType()
export class ProvidersResponse {
  @Field(() => [Provider])
  providers: Provider[];

  @Field(() => Int)
  totalCount: number;
}
