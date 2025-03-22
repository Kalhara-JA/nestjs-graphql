import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './entities/offer.entity';
import { OfferService } from './offers.service';
import { OfferResolver } from './offers.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
  ],
  providers: [OfferService, OfferResolver],
  exports: [OfferService],
})
export class OffersModule {}
