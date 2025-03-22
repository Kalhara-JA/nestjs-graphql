import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProviderService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}

  @Query(() => [Provider], { name: 'getProviders' })
  async getProviders(): Promise<Provider[]> {
    return this.providerService.findAll();
  }

  @Query(() => Provider, { name: 'getProviderById' })
  async getProvider(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Provider> {
    return this.providerService.findById(id);
  }

  @Mutation(() => Provider)
  async createProvider(
    @Args('input') input: CreateProviderDto,
  ): Promise<Provider> {
    return this.providerService.create(input);
  }

  @Mutation(() => Provider)
  async updateProvider(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProviderDto,
  ): Promise<Provider> {
    return this.providerService.update(id, input);
  }

  @Mutation(() => Provider)
  async deleteProvider(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Provider> {
    return this.providerService.delete(id);
  }
}
