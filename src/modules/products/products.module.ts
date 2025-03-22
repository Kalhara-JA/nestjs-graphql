import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductService } from './products.service';
import { ProductResolver } from './products.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductsModule {}
