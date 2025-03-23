import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductService } from './products.service';
import { ProductResolver } from './products.resolver';
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
import {
  ProductDetail,
  ProductDetailSchema,
} from './entities/product-detail.entity';
import {
  FavoriteProduct,
  FavoriteProductSchema,
} from './entities/favourite-product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: ServiceCategory.name, schema: ServiceCategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: FavoriteProduct.name, schema: FavoriteProductSchema },
    ]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductsModule {}
