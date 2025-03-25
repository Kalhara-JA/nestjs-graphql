import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provider, ProviderDocument } from './entities/provider.entity';
import { Model } from 'mongoose';
import { CreateProviderDto } from './dto/create-provider.dto';
import { Types } from 'mongoose';
import { UpdateProviderDto } from './dto/update-provider.dto';
import {
  ProviderPreferences,
  ProviderPreferencesDocument,
} from './entities/provider-preferences.entity';
import { ProvidersResponse } from './entities/providers-response.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    @InjectModel(ProviderPreferences.name)
    private providerPreferencesModel: Model<ProviderPreferencesDocument>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const createdProvider = new this.providerModel(createProviderDto);
    return createdProvider.save();
  }

  async findById(id: string): Promise<Provider> {
    const provider = await this.providerModel.findById(id);
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  async findByFirebaseId(firebaseId: string): Promise<Provider> {
    const provider = await this.providerModel.findOne({ firebaseId });
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    const updated = await this.providerModel.findByIdAndUpdate(
      id,
      updateProviderDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Provider not found');
    return updated;
  }

  async delete(id: string): Promise<Provider> {
    const deleted = await this.providerModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Provider not found');
    return deleted;
  }

  async findPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<ProvidersResponse> {
    const skip = (page - 1) * pageSize;
    const providers = await this.providerModel
      .find()
      .skip(skip)
      .limit(pageSize);
    const totalCount = await this.providerModel.countDocuments();
    return { providers, totalCount };
  }

  async exists(firebaseId: string): Promise<boolean> {
    const provider = await this.providerModel.findOne({ firebaseId });
    return provider !== null;
  }

  async getProviderPreferences(
    providerId: string,
  ): Promise<ProviderPreferences> {
    const providerIdObj = new Types.ObjectId(providerId);
    const preferences = await this.providerPreferencesModel.findOne({
      providerId: providerIdObj,
    });
    if (!preferences)
      throw new NotFoundException('Provider preferences not found');
    return preferences;
  }

  async setWorkingHours(
    providerId: string,
    startTime: string,
    endTime: string,
  ): Promise<ProviderPreferences> {
    let preferences = await this.providerPreferencesModel.findOne({
      providerId,
    });
    if (preferences) {
      preferences.workingHours = { startTime, endTime };
    } else {
      preferences = new this.providerPreferencesModel({
        providerId,
        workingHours: { startTime, endTime },
      });
    }
    return preferences.save();
  }

  async updateProviderFCMToken(
    providerId: string,
    fcmToken: string,
  ): Promise<Provider> {
    const updated = await this.providerModel.findByIdAndUpdate(
      providerId,
      { fcmToken },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Provider not found');
    return updated;
  }

  async getProviderFCMTokenById(id: string): Promise<string> {
    // First, try to validate and search by _id
    if (Types.ObjectId.isValid(id)) {
      const provider = await this.providerModel
        .findById(id)
        .select('fcmToken')
        .exec();
      if (provider && provider.fcmToken) {
        return provider.fcmToken;
      }
    }
    // If not found by _id, try by firebaseId
    const providerByFirebase = await this.providerModel
      .findOne({ firebaseId: id })
      .select('fcmToken')
      .exec();
    if (providerByFirebase && providerByFirebase.fcmToken) {
      return providerByFirebase.fcmToken;
    }
    throw new NotFoundException('Provider not found');
  }
}
