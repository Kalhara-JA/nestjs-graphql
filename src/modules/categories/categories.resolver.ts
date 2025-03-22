import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from './categories.service';
import { ServiceCategory } from './entities/service-category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // ServiceCategory queries/mutations
  @Query(() => [ServiceCategory], { name: 'getServiceCategories' })
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Mutation(() => ServiceCategory)
  async createServiceCategory(
    @Args('input') input: CreateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => ServiceCategory)
  async updateServiceCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.categoryService.updateCategory(id, input);
  }

  @Mutation(() => ServiceCategory)
  async deleteServiceCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ServiceCategory> {
    return this.categoryService.deleteCategory(id);
  }

  // SubCategory queries/mutations
  @Query(() => [SubCategory], { name: 'getSubCategoriesByCategory' })
  async getSubCategoriesByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<SubCategory[]> {
    return this.categoryService.findSubCategoriesByCategory(categoryId);
  }

  @Mutation(() => SubCategory)
  async createSubCategory(
    @Args('input') input: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.categoryService.createSubCategory(input);
  }

  @Mutation(() => SubCategory)
  async updateSubCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.categoryService.updateSubCategory(id, input);
  }

  @Mutation(() => SubCategory)
  async deleteSubCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SubCategory> {
    return this.categoryService.deleteSubCategory(id);
  }
}
