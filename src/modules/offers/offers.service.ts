import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferDocument } from './entities/offer.entity';
import { Model } from 'mongoose';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferInput } from './dto/input-offer.dto';
import { getStorage } from 'firebase-admin/storage';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class OfferService {
  private readonly bucketName = process.env.BUCKET_NAME as string;
  private readonly uploadsService = new UploadsService();
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
    const offer = await this.offerModel.findById(id).populate('categoryId');

    if (!offer) throw new NotFoundException('Offer not found');
    if (offer.imageUrl) {
      offer.imageUrl = await this.uploadsService.generateSignedUrl(
        offer.imageUrl,
      );
    }
    return offer;
  }

  async findAll(): Promise<Offer[]> {
    const offers = await this.offerModel
      .find()
      .populate('products')
      .populate('categoryId');

    for (const offer of offers) {
      if (offer.imageUrl) {
        offer.imageUrl = await this.uploadsService.generateSignedUrl(
          offer.imageUrl,
        );
      }
    }

    return offers;
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
    try {
      // 1. Find the existing offer
      const existingOffer = await this.offerModel.findById(id);
      if (!existingOffer) {
        throw new NotFoundException('Offer not found');
      }

      // 2. If there's an image URL, remove it from the storage bucket
      if (existingOffer.imageUrl) {
        // Assuming the structure of the URL includes the bucket name, e.g.:
        // https://storage.googleapis.com/bucketName/path/to/image.jpg
        // Adjust parsing logic to match how you store image URLs
        const fileName = existingOffer.imageUrl.split(`${this.bucketName}/`)[1];
        if (fileName) {
          const bucket = getStorage().bucket(this.bucketName);
          const file = bucket.file(fileName);

          await file.delete().catch((error) => {
            // Decide whether to handle missing files gracefully or throw
            console.error('Failed to delete image from bucket:', error);
          });
        }
      }

      // 3. Delete the offer from the database
      const deletedOffer = await this.offerModel.findByIdAndDelete(id);
      // If the deletion somehow returns null
      if (!deletedOffer) {
        throw new NotFoundException('Offer not found or already deleted');
      }

      // 4. Return the deleted offer document (or whatever you prefer)
      return deletedOffer;
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw new InternalServerErrorException('Failed to delete offer');
    }
  }
}
