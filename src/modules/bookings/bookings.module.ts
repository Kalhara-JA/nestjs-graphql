import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './entities/booking.entity';
import { BookingService } from './bookings.service';
import { BookingResolver } from './bookings.resolver';
import {
  ServiceCategory,
  ServiceCategorySchema,
} from '../categories/entities/service-category.entity';
import {
  SubCategory,
  SubCategorySchema,
} from '../categories/entities/sub-category.entity';
import {
  ProductDetail,
  ProductDetailSchema,
} from '../products/entities/product-detail.entity';
import { Address, AddressSchema } from '../users/entities/address.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import {
  Provider,
  ProviderSchema,
} from '../providers/entities/provider.entity';
import { Product, ProductSchema } from '../products/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
      { name: ServiceCategory.name, schema: ServiceCategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
})
export class BookingsModule {}
