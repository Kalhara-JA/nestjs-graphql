import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import {
  Provider,
  ProviderDocument,
} from '../providers/entities/provider.entity';
import {
  ServiceCategory,
  ServiceCategoryDocument,
} from '../categories/entities/service-category.entity';
import {
  SubCategory,
  SubCategoryDocument,
} from '../categories/entities/sub-category.entity';
import { FavoriteProduct } from './entities/favourite-product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    @InjectModel(ServiceCategory.name)
    private serviceCategoryModel: Model<ServiceCategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
    @InjectModel(FavoriteProduct.name)
    private favoriteProductModel: Model<FavoriteProduct>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async delete(id: string): Promise<Product> {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return deleted;
  }

  async getProductDetail(id: string): Promise<ProductDetail> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const provider = await this.providerModel.findById(product.providerId);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }
    const mainCategory = await this.serviceCategoryModel.findById(
      product.mainCategory,
    );

    if (!mainCategory) {
      throw new NotFoundException('Main category not found');
    }
    const subCategory = await this.subCategoryModel.findById(
      product.subCategory,
    );

    if (!subCategory) {
      throw new NotFoundException('Sub category not found');
    }

    return {
      ...product.toObject(),
      provider,
      mainCategory,
      subCategory,
    };
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.productModel.find({ mainCategory: categoryId }).exec();
  }

  async findBySubCategory(subCategoryId: string): Promise<Product[]> {
    const subCategoryIdObj = new Types.ObjectId(subCategoryId);
    return this.productModel.find({ subCategory: subCategoryIdObj }).exec();
  }

  async findByProvider(providerId: string): Promise<Product[]> {
    const providerIdObj = new Types.ObjectId(providerId);
    return this.productModel.find({ providerId: providerIdObj }).exec();
  }

  async getDiscountedProducts(
    discount: number,
    categoryId?: string,
    subCategoryId?: string,
  ): Promise<Product[]> {
    try {
      console.log('Inicio del service: getDiscountedProducts');
      console.log(`Filtro: descuento <= ${discount}, categoría: ${categoryId}`);

      const filters: Record<string, any> = {
        discount: { $lte: discount },
      };
      if (categoryId) {
        filters.mainCategory = new Types.ObjectId(categoryId);
      }
      if (subCategoryId) {
        filters.subCategory = new Types.ObjectId(subCategoryId);
      }

      const products = await this.productModel.find(filters).exec();
      console.log(`Productos encontrados: ${products.length}`);
      return products;
    } catch (error) {
      console.error('Error en getDiscountedProducts:', error);
      throw new Error('Failed to fetch discounted products');
    }
  }

  async getProductsWithDetails(): Promise<ProductDetail[]> {
    try {
      // Fetch products without populating the category fields
      const products = await this.productModel.find();

      // Extract unique provider IDs from the products.
      const providerIds = products
        .map((product) => product.providerId)
        .filter((id) => id != null);
      const uniqueProviderIds = [...new Set(providerIds.map(String))];

      // Extract unique main category IDs.
      const mainCategoryIds = products
        .map((product) => product.mainCategory)
        .filter((id) => id != null);
      const uniqueMainCategoryIds = [...new Set(mainCategoryIds.map(String))];

      // Extract unique sub category IDs.
      const subCategoryIds = products
        .map((product) => product.subCategory)
        .filter((id) => id != null);
      const uniqueSubCategoryIds = [...new Set(subCategoryIds.map(String))];

      // Fetch provider details directly from ProviderModel.
      const providers = await this.providerModel.find({
        _id: { $in: uniqueProviderIds },
      });
      // Create a lookup map for providers.
      const providerMap = new Map<string, Provider>();
      providers.forEach((provider) =>
        providerMap.set(String(provider._id), provider),
      );

      // Fetch main category details from ServiceCategoryModel.
      const mainCategories = await this.serviceCategoryModel.find({
        _id: { $in: uniqueMainCategoryIds },
      });
      // Create a lookup map for main categories.
      const mainCategoryMap = new Map<string, ServiceCategory>();
      mainCategories.forEach((category) =>
        mainCategoryMap.set(String(category._id), category),
      );

      // Fetch sub category details from SubCategoryModel.
      const subCategories = await this.subCategoryModel.find({
        _id: { $in: uniqueSubCategoryIds },
      });
      // Create a lookup map for sub categories.
      const subCategoryMap = new Map<string, SubCategory>();
      subCategories.forEach((category) =>
        subCategoryMap.set(String(category._id), category),
      );

      // Map each product to a ProductDetail object, joining the provider, main, and sub categories.
      const details: ProductDetail[] = products.map((product) => {
        const provider = providerMap.get(product.providerId.toString());
        const mainCategory = mainCategoryMap.get(
          product.mainCategory.toString(),
        );
        const subCategory = subCategoryMap.get(product.subCategory.toString());

        return {
          id: (product._id as string).toString(),
          title: product.title,
          description: product.description,
          rate: product.rate,
          rating: product.rating,
          jobs: product.jobs,
          image: product.image,
          provider: provider as Provider,
          mainCategory: mainCategory as ServiceCategory,
          subCategory: subCategory as SubCategory,
          includeSupplies: product.includeSupplies,
          includeTools: product.includeTools,
        };
      });

      return details;
    } catch (error) {
      console.error('Error fetching products with details:', error);
      throw new Error('Failed to fetch products with details.');
    }
  }

  async addFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<FavoriteProduct> {
    // Check if the product is already favorited by the user
    const existingFavorite = await this.favoriteProductModel.findOne({
      userId,
      productId,
    });
    if (existingFavorite) {
      throw new ConflictException('Product already in favorites');
    }
    const favorite = new this.favoriteProductModel({ userId, productId });
    return favorite.save();
  }

  async removeFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<FavoriteProduct> {
    const favorite = await this.favoriteProductModel.findOneAndDelete({
      userId,
      productId,
    });
    if (!favorite) {
      throw new NotFoundException('Favorite product not found');
    }
    return favorite;
  }
}
