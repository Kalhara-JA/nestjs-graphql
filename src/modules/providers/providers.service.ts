import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Provider, ProviderDocument } from './entities/provider.entity';
import { Model } from 'mongoose';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
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
}
