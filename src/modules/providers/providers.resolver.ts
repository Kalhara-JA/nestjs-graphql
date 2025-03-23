import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { ProviderService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ProvidersResponse } from './entities/providers-response.entity';
import { ProviderPreferences } from './entities/provider-preferences.entity';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(private readonly providerService: ProviderService) {}

  @Query(() => [Provider], { name: 'getProviders' })
  async getProviders(): Promise<Provider[]> {
    return this.providerService.findAll();
  }

  @Query(() => Provider, { name: 'getProvider' })
  async getProvider(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Provider> {
    return this.providerService.findById(id);
  }

  @Query(() => ProvidersResponse, { name: 'getProvidersPaginated' })
  async getProvidersPaginated(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ): Promise<ProvidersResponse> {
    return this.providerService.findPaginated(page, pageSize);
  }

  @Query(() => Provider, { name: 'getProviderByFirebaseId' })
  async getProviderByFirebaseId(
    @Args('firebaseId', { type: () => String }) firebaseId: string,
  ): Promise<Provider> {
    return this.providerService.findByFirebaseId(firebaseId);
  }

  @Query(() => Boolean, { name: 'providerExists' })
  async providerExists(
    @Args('firebaseId', { type: () => String }) firebaseId: string,
  ): Promise<boolean> {
    return this.providerService.exists(firebaseId);
  }

  @Query(() => ProviderPreferences, { name: 'getProviderPreferences' })
  async getProviderPreferences(
    @Args('providerId', { type: () => ID }) providerId: string,
  ): Promise<ProviderPreferences> {
    return this.providerService.getProviderPreferences(providerId);
  }

  @Query(() => String, { name: 'getProviderFCMTokenById' })
  async getProviderFCMTokenById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    return this.providerService.getProviderFCMTokenById(id);
  }

  @Mutation(() => Provider)
  async createProvider(@Args() input: CreateProviderDto): Promise<Provider> {
    return this.providerService.create(input);
  }

  @Mutation(() => Provider)
  async updateProvider(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateProviderDto,
  ): Promise<Provider> {
    return this.providerService.update(id, input);
  }

  @Mutation(() => Provider)
  async deleteProvider(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Provider> {
    return this.providerService.delete(id);
  }

  @Mutation(() => ProviderPreferences)
  async setWorkingHours(
    @Args('providerId', { type: () => ID }) providerId: string,
    @Args('startTime', { type: () => String }) startTime: string,
    @Args('endTime', { type: () => String }) endTime: string,
  ): Promise<ProviderPreferences> {
    return this.providerService.setWorkingHours(providerId, startTime, endTime);
  }

  @Mutation(() => Provider)
  async updateProviderFCMToken(
    @Args('providerId', { type: () => ID }) providerId: string,
    @Args('fcmToken', { type: () => String }) fcmToken: string,
  ): Promise<Provider> {
    return this.providerService.updateProviderFCMToken(providerId, fcmToken);
  }
}
