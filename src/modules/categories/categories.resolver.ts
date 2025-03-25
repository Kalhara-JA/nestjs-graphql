import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  createUnionType,
} from '@nestjs/graphql';
import { CategoryService } from './categories.service';
import { ServiceCategory } from './entities/service-category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

export const CategoryUnion = createUnionType({
  name: 'CategoryUnion',
  types: () => [ServiceCategory, SubCategory] as const,
  resolveType(value: ServiceCategory | SubCategory) {
    // If the object has a 'categoryId' property, treat it as a SubCategory.
    if ('categoryId' in value && value.categoryId !== undefined) {
      return SubCategory;
    }
    return ServiceCategory;
  },
});

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // ServiceCategory queries/mutations
  @Query(() => [ServiceCategory], {
    name: 'getServiceCategories',
    nullable: 'itemsAndList',
  })
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Query(() => ServiceCategory, { name: 'getServiceCategory', nullable: true })
  async getServiceCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ServiceCategory> {
    return this.categoryService.findCategoryById(id);
  }

  @Query(() => SubCategory, { name: 'getSubCategory', nullable: true })
  async getSubCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SubCategory> {
    return this.categoryService.findSubCategoryById(id);
  }

  @Query(() => [ServiceCategory], {
    name: 'getAllCategoriesAndSubCategories',
    nullable: 'itemsAndList',
  })
  async getAllCategoriesAndSubCategories(): Promise<ServiceCategory[]> {
    return this.categoryService.findAllCategoriesAndSubCategories();
  }

  @Mutation(() => ServiceCategory, { nullable: true })
  async createServiceCategory(
    @Args() input: CreateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => ServiceCategory, { nullable: true })
  async updateServiceCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.categoryService.updateCategory(id, input);
  }

  @Mutation(() => ServiceCategory, { nullable: true })
  async deleteServiceCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ServiceCategory> {
    return this.categoryService.deleteCategory(id);
  }

  // SubCategory queries/mutations
  @Query(() => [SubCategory], {
    name: 'getSubCategoriesByCategory',
    nullable: 'itemsAndList',
  })
  async getSubCategoriesByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<SubCategory[]> {
    return this.categoryService.findSubCategoriesByCategory(categoryId);
  }

  @Query(() => [CategoryUnion], {
    name: 'searchCategories',
    nullable: 'itemsAndList',
  })
  async searchCategories(
    @Args('searchTerm', { type: () => String }) searchTerm: string,
  ): Promise<(ServiceCategory | SubCategory)[]> {
    return this.categoryService.searchCategories(searchTerm);
  }

  @Mutation(() => SubCategory, { nullable: true })
  async createSubCategory(
    @Args() input: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.categoryService.createSubCategory(input);
  }

  @Mutation(() => SubCategory, { nullable: true })
  async updateSubCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.categoryService.updateSubCategory(id, input);
  }

  @Mutation(() => SubCategory, { nullable: true })
  async deleteSubCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SubCategory> {
    return this.categoryService.deleteSubCategory(id);
  }
}
