import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferDocument } from './entities/offer.entity';
import { Model } from 'mongoose';
// import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferInput } from './dto/input-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {}

  async create(createOfferDto: OfferInput): Promise<Offer> {
    const offer = new this.offerModel({
      ...createOfferDto,
      creationDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    });
    return offer.save();
  }

  async findById(id: string): Promise<Offer> {
    const offer = await this.offerModel.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    updateOfferDto['updateDate'] = new Date().toISOString();
    const updated = await this.offerModel.findByIdAndUpdate(
      id,
      updateOfferDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Offer not found');
    return updated;
  }

  async delete(id: string): Promise<Offer> {
    const deleted = await this.offerModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Offer not found');
    return deleted;
  }
}
