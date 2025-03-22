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
}
