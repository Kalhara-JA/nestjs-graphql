import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ReviewService } from './reviews.service';
import { ReviewResolver } from './reviews.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewsModule {}
