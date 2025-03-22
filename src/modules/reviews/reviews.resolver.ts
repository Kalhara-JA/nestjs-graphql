import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReviewService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => Review, { name: 'getReviewById' })
  async getReview(@Args('id', { type: () => ID }) id: string): Promise<Review> {
    return this.reviewService.findById(id);
  }

  @Query(() => [Review], { name: 'getReviewsByProduct' })
  async getReviewsByProduct(
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<Review[]> {
    return this.reviewService.findByProduct(productId);
  }

  @Mutation(() => Review)
  async createReview(@Args('input') input: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(input);
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, input);
  }

  @Mutation(() => Review)
  async deleteReview(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Review> {
    return this.reviewService.delete(id);
  }
}
