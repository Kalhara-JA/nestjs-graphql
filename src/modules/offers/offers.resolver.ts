import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OfferService } from './offers.service';
import { Offer } from './entities/offer.entity';
// import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferInput } from './dto/input-offer.dto';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) {}

  @Query(() => [Offer], { name: 'getOffers' })
  async getOffers(): Promise<Offer[]> {
    return this.offerService.findAll();
  }

  @Query(() => Offer, { name: 'getOffer' })
  async getOffer(@Args('id', { type: () => ID }) id: string): Promise<Offer> {
    return this.offerService.findById(id);
  }

  @Mutation(() => Offer)
  async createOffer(@Args() input: OfferInput): Promise<Offer> {
    return this.offerService.create(input);
  }

  @Mutation(() => Offer)
  async updateOffer(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateOfferDto,
  ): Promise<Offer> {
    return this.offerService.update(id, input);
  }

  @Mutation(() => String)
  async deleteOffer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Offer> {
    return this.offerService.delete(id);
  }
}
