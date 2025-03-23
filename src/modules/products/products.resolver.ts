import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { FavoriteProduct } from './entities/favourite-product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'getProducts' })
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'getProduct' })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }

  @Query(() => ProductDetail, { name: 'getProductDetail' })
  async getProductDetail(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductDetail> {
    return this.productService.getProductDetail(id);
  }

  @Query(() => [Product], { name: 'getProductsByCategory' })
  async getProductsByCategory(
    @Args('categoryId', { type: () => ID }) categoryId: string,
  ): Promise<Product[]> {
    return this.productService.findByCategory(categoryId);
  }

  @Query(() => [Product], { name: 'getProductsBySubCategory' })
  async getProductsBySubCategory(
    @Args('subCategoryId', { type: () => ID }) subCategoryId: string,
  ): Promise<Product[]> {
    return this.productService.findBySubCategory(subCategoryId);
  }

  @Query(() => [Product], { name: 'getProductsByProvider' })
  async getProductsByProvider(
    @Args('providerId', { type: () => ID }) providerId: string,
  ): Promise<Product[]> {
    return this.productService.findByProvider(providerId);
  }

  @Query(() => [Product], { name: 'getDiscountedProducts' })
  async getDiscountedProducts(
    @Args('discount', { type: () => Float }) discount: number,
    @Args('categoryId', { type: () => ID, nullable: true }) categoryId?: string,
    @Args('subCategoryId', { type: () => ID, nullable: true })
    subCategoryId?: string,
  ): Promise<Product[]> {
    return this.productService.getDiscountedProducts(
      discount,
      categoryId,
      subCategoryId,
    );
  }

  @Query(() => [ProductDetail], { name: 'getProductsWithDetails' })
  async getProductsWithDetails(): Promise<ProductDetail[]> {
    return this.productService.getProductsWithDetails();
  }

  @Mutation(() => Product)
  async createProduct(@Args() input: CreateProductDto): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  @Mutation(() => Product)
  async deleteProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.delete(id);
  }

  @Mutation(() => FavoriteProduct)
  async addFavoriteProduct(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<FavoriteProduct> {
    return this.productService.addFavoriteProduct(userId, productId);
  }

  @Mutation(() => FavoriteProduct)
  async removeFavoriteProduct(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<FavoriteProduct> {
    return this.productService.removeFavoriteProduct(userId, productId);
  }
}
