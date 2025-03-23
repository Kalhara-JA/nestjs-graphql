import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ReviewService } from './reviews.service';
import { ReviewResolver } from './reviews.resolver';
import {
  ReviewDetails,
  ReviewDetailsSchema,
} from './entities/review-details.entity';
import {
  ServiceCategory,
  ServiceCategorySchema,
} from '../categories/entities/service-category.entity';
import {
  SubCategory,
  SubCategorySchema,
} from '../categories/entities/sub-category.entity';
import {
  Provider,
  ProviderSchema,
} from '../providers/entities/provider.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { Product, ProductSchema } from '../products/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      {
        name: ReviewDetails.name,
        schema: ReviewDetailsSchema,
      },
      { name: User.name, schema: UserSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: ServiceCategory.name, schema: ServiceCategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewsModule {}
