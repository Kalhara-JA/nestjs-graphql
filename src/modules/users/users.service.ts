import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { LegalData } from './entities/legal-data.entity';
import { FavoriteProduct } from '../products/entities/favourite-product.entity';
import { UsersResponse } from './entities/users-response.entity';
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
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('User not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    return this.addressModel.find({ userId: userIdObj }).exec();
  }

  async getLegalDataByUserId(userId: string): Promise<LegalData> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('User not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    const legalData = await this.legalDataModel
      .findOne({ userId: userIdObj })
      .exec();
    if (!legalData) throw new NotFoundException('Legal Data not found');
    return legalData;
  }

  async getFavoriteProductsByUserId(
    userId: string,
  ): Promise<FavoriteProduct[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('User not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    return this.favoriteProductModel.find({ userId: userIdObj }).exec();
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

  async getUsersPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<UsersResponse> {
    if (page < 1) {
      page = 1;
    }
    const skip = (page - 1) * pageSize;
    const users = await this.userModel.find().skip(skip).limit(pageSize).exec();
    const totalCount = await this.userModel.countDocuments();
    return { users, totalCount };
  }

  async getUserFCMTokenById(id: string): Promise<string> {
    // Check if the provided id is a valid ObjectId.
    const userIdObj = new Types.ObjectId(id);
    if (Types.ObjectId.isValid(userIdObj)) {
      const user = await this.userModel
        .findById(userIdObj)
        .select('fcmToken')
        .exec();
      if (user) {
        if (!user.fcmToken) {
          throw new NotFoundException('FCM Token not found');
        }
        return user.fcmToken;
      }
    }
    // If not found by ObjectId, try to find a user by firebaseId.
    const userByFirebase = await this.userModel
      .findOne({ firebaseId: id })
      .select('fcmToken')
      .exec();
    if (userByFirebase) {
      if (!userByFirebase.fcmToken) {
        throw new NotFoundException('FCM Token not found');
      }
      return userByFirebase.fcmToken;
    }
    throw new NotFoundException('User not found');
  }
}
