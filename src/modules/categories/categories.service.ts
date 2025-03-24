import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ServiceCategory,
  ServiceCategoryDocument,
} from './entities/service-category.entity';
import {
  SubCategory,
  SubCategoryDocument,
} from './entities/sub-category.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(ServiceCategory.name)
    private categoryModel: Model<ServiceCategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async createCategory(
    dto: CreateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const category = new this.categoryModel(dto);
    return category.save();
  }

  async updateCategory(
    id: string,
    dto: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const updated = await this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async deleteCategory(id: string): Promise<ServiceCategory> {
    const deleted = await this.categoryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Category not found');
    return deleted;
  }

  async createSubCategory(dto: CreateSubCategoryDto): Promise<SubCategory> {
    const subCategory = new this.subCategoryModel(dto);
    return subCategory.save();
  }

  async updateSubCategory(
    id: string,
    dto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    const updated = await this.subCategoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('SubCategory not found');
    return updated;
  }

  async deleteSubCategory(id: string): Promise<SubCategory> {
    const deleted = await this.subCategoryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('SubCategory not found');
    return deleted;
  }

  async findAllCategories(): Promise<ServiceCategory[]> {
    return this.categoryModel.find().exec();
  }

  async findSubCategoriesByCategory(
    categoryId: string,
  ): Promise<SubCategory[]> {
    return this.subCategoryModel.find({ categoryId }).exec();
  }

  async searchCategories(searchTerm: string): Promise<ServiceCategory[]> {
    try {
      // Search for categories where the title matches the search term (case-insensitive)
      const categories = await this.categoryModel
        .find({
          title: new RegExp(searchTerm, 'i'),
        })
        .exec();

      categories.forEach((category) => {
        category.id = category._id;
      });

      return categories;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw new Error('Failed to search categories');
    }
  }

  async findCategoryById(id: string): Promise<ServiceCategory> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  // New service method: Find a single subcategory by its ID
  async findSubCategoryById(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel.findById(id).exec();
    if (!subCategory) throw new NotFoundException('SubCategory not found');
    return subCategory;
  }

  // New service method: Get all categories with their subCategories
  async findAllCategoriesAndSubCategories(): Promise<ServiceCategory[]> {
    const categories = await this.categoryModel.find().exec();

    // Populate each category with its subCategories
    const categoriesWithSubCategories = await Promise.all(
      categories.map(async (category) => {
        const subCategories = await this.subCategoryModel
          .find({ categoryId: category._id })
          .exec();
        return {
          ...category.toObject(),
          subCategories,
        };
      }),
    );

    // Assign the ID field to each category and subCategory
    categoriesWithSubCategories.forEach((category) => {
      category.id = category._id;
      category.subCategories.forEach((subCategory) => {
        subCategory.id = subCategory._id;
      });
    });

    return categoriesWithSubCategories;
  }
}
