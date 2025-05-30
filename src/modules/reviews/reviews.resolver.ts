import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReviewService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDetails } from './entities/review-details.entity';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => Review, { name: 'getReview', nullable: true })
  async getReview(@Args('id', { type: () => ID }) id: string): Promise<Review> {
    return this.reviewService.findById(id);
  }

  @Query(() => [Review], {
    name: 'getReviewsByProduct',
    nullable: 'itemsAndList',
  })
  async getReviewsByProduct(
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<Review[]> {
    return this.reviewService.findByProduct(productId);
  }

  @Query(() => [ReviewDetails], {
    name: 'getReviewsWithDetailsByProduct',
    nullable: 'itemsAndList',
  })
  async getReviewsWithDetailsByProduct(
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<ReviewDetails[]> {
    return this.reviewService.getReviewsWithDetailsByProduct(productId);
  }

  // New Query: Reviews with detailed info for a given provider
  @Query(() => [ReviewDetails], {
    name: 'getReviewsWithDetailsByProvider',
    nullable: 'itemsAndList',
  })
  async getReviewsWithDetailsByProvider(
    @Args('providerId', { type: () => ID }) providerId: string,
  ): Promise<ReviewDetails[]> {
    return this.reviewService.getReviewsWithDetailsByProvider(providerId);
  }

  @Mutation(() => Review, { nullable: true })
  async createReview(@Args() input: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(input);
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, input);
  }

  @Mutation(() => String, { nullable: true })
  async deleteReview(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    return this.reviewService.delete(id);
  }
}
