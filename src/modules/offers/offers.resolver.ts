import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OfferService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { OfferInput } from './dto/input-offer.dto';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Query(() => [Offer], { name: 'getOffers', nullable: 'itemsAndList' })
  async getOffers(): Promise<Offer[]> {
    return this.offerService.findAll();
  }

  @Query(() => Offer, { name: 'getOffer', nullable: true })
  async getOffer(@Args('id', { type: () => ID }) id: string): Promise<Offer> {
    return this.offerService.findById(id);
  }

  @Mutation(() => Offer, { nullable: true })
  async createOffer(@Args('input') input: OfferInput): Promise<Offer> {
    return this.offerService.create(input);
  }

  @Mutation(() => Offer, { nullable: true })
  async updateOffer(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: OfferInput,
  ): Promise<Offer> {
    return this.offerService.update(id, input);
  }

  @Mutation(() => String, { nullable: true })
  async deleteOffer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Offer> {
    return this.offerService.delete(id);
  }
}
