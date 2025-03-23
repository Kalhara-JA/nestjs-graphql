import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      // 1. Create the new review document
      const newReview = new this.reviewModel({
        ...createReviewDto,
        date: new Date(), // or any other date logic you need
      });

      await newReview.save();

      // 2. Fetch the related product to update its average rating
      const product = await this.productModel.findById(
        createReviewDto.productId,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Count how many total reviews the product has
      const totalReviews = await this.reviewModel.countDocuments({
        productId: createReviewDto.productId,
      });

      // If the product has no previous rating, default to 0
      const currentProductRating = product.rating || 0;
      // new total rating = (old rating * (totalReviews - 1) + new rating) / totalReviews
      const totalRatingSum =
        currentProductRating * (totalReviews - 1) + createReviewDto.rating;

      const newAverageRating =
        totalReviews > 0 ? totalRatingSum / totalReviews : 0;

      // Update the product’s average rating
      product.rating = newAverageRating;
      await product.save();

      // 3. Update the provider’s average rating
      const providerId = product.providerId;
      const providerProducts = await this.productModel.find({ providerId });
      if (providerProducts.length > 0) {
        // Count reviews across all of this provider’s products
        const totalProviderReviews = await this.reviewModel.countDocuments({
          productId: { $in: providerProducts.map((p) => p._id) },
        });

        // Sum up the products’ ratings * total reviews, then average them
        let totalProviderRatingSum = 0;
        for (const prod of providerProducts) {
          const rating = prod.rating || 0;
          totalProviderRatingSum += rating * totalProviderReviews;
        }

        const newProviderAverageRating =
          totalProviderReviews > 0
            ? totalProviderRatingSum / totalProviderReviews
            : 0;

        const provider = await this.providerModel.findById(providerId);
        if (provider) {
          provider.rating = newProviderAverageRating;
          await provider.save();
        }
      }

      // 4. Return the newly created review
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      throw new InternalServerErrorException('Failed to create review');
    }
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
    try {
      // 1. Find the existing review
      const existingReview = await this.reviewModel.findById(id);
      if (!existingReview) {
        throw new NotFoundException('Review not found');
      }

      // 2. Update the review document
      const { rating, comment } = updateReviewDto;
      const updatedReview = await this.reviewModel.findByIdAndUpdate(
        id,
        { rating, comment },
        { new: true },
      );
      // This check is often redundant here since we did a findById, but kept just in case
      if (!updatedReview) {
        throw new NotFoundException('Review not found after update');
      }

      // 3. Recalculate the product’s average rating
      const product = await this.productModel.findById(
        existingReview.productId,
      );
      if (!product) {
        // If product is missing, we can either throw or skip rating logic
        throw new NotFoundException('Associated product not found');
      }

      // Gather all reviews for this product
      const productReviews = await this.reviewModel.find({
        productId: product._id,
      });
      const totalReviews = productReviews.length;

      const totalRatingSum = productReviews.reduce(
        (sum, r) => sum + (r.rating || 0),
        0,
      );
      const newAverageRating =
        totalReviews > 0 ? totalRatingSum / totalReviews : 0;

      // Update and save the product with the new average
      product.rating = newAverageRating;
      await product.save();

      // 4. Recalculate the provider’s average rating
      const providerId = product.providerId;
      const provider = await this.providerModel.findById(providerId);

      // Skip if there's no associated provider
      if (provider) {
        // Fetch all products belonging to this provider
        const providerProducts = await this.productModel.find({ providerId });

        // Get all reviews across this provider’s products
        const providerProductIds = providerProducts.map((p) => p._id);
        const providerReviews = await this.reviewModel.find({
          productId: { $in: providerProductIds },
        });
        const totalProviderReviews = providerReviews.length;

        // Sum of each product’s rating * 1 (since each rating is the same “weight”)
        // Because we already have each product rating saved individually in the DB,
        // an alternative approach is to average the product ratings. Here, we’re
        // using each review’s rating for accuracy.
        const totalProviderRatingSum = providerReviews.reduce(
          (sum, r) => sum + (r.rating || 0),
          0,
        );

        const newProviderAverageRating =
          totalProviderReviews > 0
            ? totalProviderRatingSum / totalProviderReviews
            : 0;

        // Update and save the provider
        provider.rating = newProviderAverageRating;
        await provider.save();
      }

      // 5. Return the updated review
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw new InternalServerErrorException('Failed to update review');
    }
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
