import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDetails } from './entities/review-details.entity';
import {
  ServiceCategory,
  ServiceCategoryDocument,
} from '../categories/entities/service-category.entity';
import {
  SubCategory,
  SubCategoryDocument,
} from '../categories/entities/sub-category.entity';
import { Product, ProductDocument } from '../products/entities/product.entity';
import {
  Provider,
  ProviderDocument,
} from '../providers/entities/provider.entity';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(ServiceCategory.name)
    private serviceCategoryModel: Model<ServiceCategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
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

  async delete(id: string): Promise<string> {
    const deleted = await this.reviewModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Review not found');
    return 'Review deleted successfully';
  }

  // New method: get detailed reviews for a given product
  async getReviewsWithDetailsByProduct(
    productId: string,
  ): Promise<ReviewDetails[]> {
    const reviews = await this.reviewModel.find({ productId }).exec();

    const detailedReviews: ReviewDetails[] = await Promise.all(
      reviews.map(async (review) => {
        const user = await this.userModel.findById(review.userId);
        const category = await this.serviceCategoryModel.findById(
          review.categoryId,
        );
        const subCategory = await this.subCategoryModel.findById(
          review.subCategoryId,
        );
        const provider = await this.providerModel.findById(review.providerId);

        return {
          id: review._id?.toString() || '', // Safely convert ObjectId to string or fallback to an empty string
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          user: user as unknown as User, // Ensure user matches the User type or remains undefined
          category: category ? category.title : 'Category not found',
          subCategory: subCategory
            ? subCategory.title
            : 'Subcategory not found',
          provider: provider as unknown as Provider,
          servicesCount: 0, // Assuming you need to include this from somewhere
        };
      }),
    );

    return detailedReviews;
  }

  // New method: get detailed reviews for a given provider
  async getReviewsWithDetailsByProvider(
    providerId: string,
  ): Promise<ReviewDetails[]> {
    // First, find all products for this provider.
    const providerProducts = await this.productModel
      .find({ providerId })
      .exec();
    const servicesCount = providerProducts.length;
    if (servicesCount === 0) {
      return [];
    }
    // Find reviews associated with these products.
    const productIds = providerProducts.map((p) => p._id);
    const reviews = await this.reviewModel
      .find({ productId: { $in: productIds } })
      .exec();
    if (reviews.length === 0) {
      return [];
    }
    // Optionally, update provider rating
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const averageRating = totalRatings / reviews.length;
    await this.providerModel.findByIdAndUpdate(providerId, {
      rating: averageRating,
    });

    const detailedReviews: ReviewDetails[] = await Promise.all(
      reviews.map(async (review) => {
        const user = await this.userModel.findById(review.userId);
        const category = await this.serviceCategoryModel.findById(
          review.categoryId,
        );
        const subCategory = await this.subCategoryModel.findById(
          review.subCategoryId,
        );
        const provider = await this.providerModel.findById(providerId);

        return {
          id: review._id?.toString() || '',
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          user: user as unknown as User, // Convert null to undefined
          category: category ? category.title : 'Categoría no encontrada',
          subCategory: subCategory
            ? subCategory.title
            : 'Subcategoría no encontrada',
          provider: provider as unknown as Provider, // Convert null to undefined
          servicesCount,
        };
      }),
    );
    return detailedReviews;
  }
}
