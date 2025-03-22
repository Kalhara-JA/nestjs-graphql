import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceCategory,
  ServiceCategorySchema,
} from './entities/service-category.entity';
import { SubCategory, SubCategorySchema } from './entities/sub-category.entity';
import { CategoryService } from './categories.service';
import { CategoryResolver } from './categories.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceCategory.name, schema: ServiceCategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
  ],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoriesModule {}
