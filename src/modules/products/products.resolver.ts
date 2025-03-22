import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'getProducts' })
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'getProductById' })
  async getProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  @Mutation(() => Product)
  async deleteProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product> {
    return this.productService.delete(id);
  }
}
