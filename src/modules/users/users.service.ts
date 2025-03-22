import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { LegalData } from './entities/legal-data.entity';
import { FavoriteProduct } from '../products/entities/favourite-product.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(LegalData.name) private legalDataModel: Model<LegalData>,
    @InjectModel(FavoriteProduct.name)
    private favoriteProductModel: Model<FavoriteProduct>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByFirebaseId(firebaseId: string): Promise<User> {
    const user = await this.userModel.findOne({ firebaseId });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async updateUserFCMToken(id: string, fcmToken: string): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(
      id,
      { fcmToken },
      { new: true },
    );
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async getAddressesByUserId(userId: string): Promise<Address[]> {
    return this.addressModel.find({ userId }).exec();
  }

  async getLegalDataByUserId(userId: string): Promise<LegalData> {
    const legalData = await this.legalDataModel.findOne({ userId }).exec();
    if (!legalData) throw new NotFoundException('Legal Data not found');
    return legalData;
  }

  async getFavoriteProductsByUserId(
    userId: string,
  ): Promise<FavoriteProduct[]> {
    return this.favoriteProductModel.find({ userId }).exec();
  }

  async createAddress(createAddressDto: {
    name: string;
    address: string;
    userId: string;
    latitude?: string;
    longitude?: string;
    additional?: string;
  }): Promise<Address> {
    const newAddress = new this.addressModel(createAddressDto);
    return newAddress.save();
  }

  async createLegalData(createLegalDataDto: {
    userId: string;
    personType: string;
    documentType: string;
    documentNumber: string;
  }): Promise<LegalData> {
    const legalData = new this.legalDataModel(createLegalDataDto);
    return legalData.save();
  }

  async updateLegalData(
    id: string,
    updateLegalDataDto: {
      personType?: string;
      documentType?: string;
      documentNumber?: string;
    },
  ): Promise<LegalData> {
    const updated = await this.legalDataModel.findByIdAndUpdate(
      id,
      updateLegalDataDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException('Legal Data not found');
    return updated;
  }
}
