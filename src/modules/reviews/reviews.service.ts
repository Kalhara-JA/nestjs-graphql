import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updated = await this.reviewModel.findByIdAndUpdate(
      id,
      updateReviewDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Review not found');
    return updated;
  }

  async delete(id: string): Promise<Review> {
    const deleted = await this.reviewModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Review not found');
    return deleted;
  }
}
