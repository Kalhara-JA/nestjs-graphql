import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './entities/booking.entity';
import { Model, FilterQuery } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { UpdateBookingTypeDto } from './dto/update-booking-type.dto';
import { randomBytes } from 'crypto';
import { User, UserDocument } from '../users/entities/user.entity';
import { Address, AddressDocument } from '../users/entities/address.entity';
import {
  Provider,
  ProviderDocument,
} from '../providers/entities/provider.entity';
import { Product, ProductDocument } from '../products/entities/product.entity';
import {
  ServiceCategory,
  ServiceCategoryDocument,
} from '../categories/entities/service-category.entity';
import {
  SubCategory,
  SubCategoryDocument,
} from '../categories/entities/sub-category.entity';
import { BookingDetail } from './entities/booking-detail.entity';
import { ProductDetail } from '../products/entities/product-detail.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ServiceCategory.name)
    private serviceCategoryModel: Model<ServiceCategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const bookingNumber = randomBytes(5).toString('hex').toUpperCase();
    const securityCode = randomBytes(2).toString('hex').toUpperCase();
    const createdBooking = new this.bookingModel({
      ...createBookingDto,
      bookingNumber,
      securityCode,
      status: 'pending',
    });
    return createdBooking.save();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookingModel.find({ userId }).exec();
  }

  async findByProvider(providerId: string): Promise<Booking[]> {
    return this.bookingModel.find({ providerId }).exec();
  }

  async updateStatus(
    id: string,
    updateDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(
      id,
      { status: updateDto.status, notes: updateDto.notes },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Booking not found');
    return updated;
  }

  async updateType(
    id: string,
    updateDto: UpdateBookingTypeDto,
  ): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(
      id,
      { type: updateDto.type, newPrice: updateDto.newPrice },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Booking not found');
    return updated;
  }

  // New Method: get accepted bookings by provider (status "confirmed")
  async getAcceptedBookingsByProvider(
    providerId: string,
    date?: string,
  ): Promise<Booking[]> {
    const query: FilterQuery<BookingDocument> = {
      providerId,
      status: 'confirmed',
    };
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }
    return this.bookingModel.find(query).exec();
  }

  // New Method: get detailed booking info
  // New Method: get detailed booking info
  async getBookingDetail(bookingId: string): Promise<BookingDetail> {
    // Retrieve the booking first
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Run the related queries in parallel for better performance
    const [user, address, provider, product] = await Promise.all([
      this.userModel.findById(booking.userId),
      this.addressModel.findById(booking.address),
      this.providerModel.findById(booking.providerId),
      this.productModel.findById(booking.productId),
    ]);

    // Explicitly type productDetail as ProductDetail | undefined
    let productDetail: ProductDetail | undefined = undefined;
    if (product) {
      const [mainCategory, subCategory, productProvider] = await Promise.all([
        this.serviceCategoryModel.findById(product.mainCategory),
        this.subCategoryModel.findById(product.subCategory),
        this.providerModel.findById(product.providerId),
      ]);

      if (!mainCategory || !subCategory || !productProvider) {
        throw new NotFoundException('Product details not found');
      }

      productDetail = {
        ...product.toObject(),
        mainCategory: mainCategory,
        subCategory: subCategory,
        provider: productProvider,
      };
    }

    return {
      booking,
      user: user || undefined,
      address: address || undefined,
      provider: provider || undefined,
      product: productDetail,
    };
  }
}
