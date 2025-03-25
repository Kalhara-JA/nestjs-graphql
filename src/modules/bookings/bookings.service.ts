/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './entities/booking.entity';
import { Model, FilterQuery, Types } from 'mongoose';
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
import { formatDateToDDMMYYYY } from 'src/utils/format.util';
import { messaging } from 'firebase-admin';

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
    const bookingCreated = await createdBooking.save();

    const provider = await this.providerModel.findById(
      createBookingDto.providerId,
    );

    if (provider && provider.fcmToken) {
      const currentDate = new Date();
      const formattedDate = formatDateToDDMMYYYY(currentDate);
      const message = {
        notification: {
          title: 'Nuevo servicio solicitado',
          body: `Tienes un nuevo servicio solicitado para el ${formattedDate} a las ${createBookingDto.time}, entra ahora para aceptarlo o rechazarlo`,
        },
        token: provider.fcmToken,
      };

      messaging()
        .send(message)
        .then((response) => console.log('Successfully sent message:', response))
        .catch((error) => console.log('Error sending message:', error));
    }

    return bookingCreated;
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    // Convert userId to an ObjectId if it’s a valid 24-character hex string
    const convertedUserId = Types.ObjectId.isValid(userId)
      ? new Types.ObjectId(userId)
      : userId;

    const bookings = await this.bookingModel.find({ userId: convertedUserId });
    return bookings;
  }

  async findByProvider(providerId: string): Promise<Booking[]> {
    if (!Types.ObjectId.isValid(providerId)) {
      throw new Error('Invalid providerId format');
    }
    const objectId = new Types.ObjectId(providerId);
    return this.bookingModel.find({ providerId: objectId }).exec();
  }

  async updateStatus(
    id: string,
    updateDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    try {
      // 1. Update the booking with the new status and notes
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(
        id,
        {
          status: updateDto.status,
          notes: updateDto.notes,
        },
        { new: true },
      );

      if (!updatedBooking) {
        throw new NotFoundException('Booking not found');
      }

      // 2. Gather related data (user, provider, product, category)
      const booking = updatedBooking;
      const user = await this.userModel.findById(booking.userId);
      const provider = await this.providerModel.findById(booking.providerId);
      const product = await this.productModel.findById(booking.productId);

      // Guard against missing product
      if (!product) {
        return updatedBooking;
      }

      const mainCategory = await this.serviceCategoryModel.findById(
        product.mainCategory,
      );

      // 3. Map statuses to Spanish equivalents (adjust to your needs)
      const bookingStatusMap = {
        confirmed: 'Confirmado',
        started: 'Iniciado',
        pending: 'Pendiente',
        cancelled: 'Cancelado',
        completed: 'Completado',
      };

      const translatedStatus =
        bookingStatusMap[updateDto.status] || updateDto.status;

      // 4. If the user has an FCM token, send a push notification
      if (user?.fcmToken) {
        const userMessage = {
          notification: {
            title: 'Estado de tu servicio',
            body: `Tu servicio de ${mainCategory?.title ?? 'servicio'} ha cambiado a estado: ${translatedStatus}. Entra ahora para verificarlo.`,
          },
          token: user.fcmToken,
        };

        messaging()
          .send(userMessage)
          .then((response) =>
            console.log('Successfully sent message to user:', response),
          )
          .catch((error) =>
            console.error('Error sending message to user:', error),
          );

        // 5. If the booking was completed, optionally notify the provider too
        if (updateDto.status === 'completed' && provider?.fcmToken) {
          const providerMessage = {
            notification: {
              title: 'Servicio finalizado',
              body: `Tu servicio de ${mainCategory?.title ?? 'servicio'} ha finalizado ¡Bien hecho!`,
            },
            token: provider.fcmToken,
          };

          messaging()
            .send(providerMessage)
            .then((response) =>
              console.log('Successfully sent message to provider:', response),
            )
            .catch((error) =>
              console.error('Error sending message to provider:', error),
            );
        }
      }

      // 6. Return the updated booking
      return updatedBooking;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw new InternalServerErrorException(
        'Failed to update booking status.',
      );
    }
  }

  async updateType(
    id: string,
    updateDto: UpdateBookingTypeDto,
  ): Promise<Booking> {
    try {
      // 1. Update the booking's type and price
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(
        id,
        {
          type: updateDto.type,
          newPrice: updateDto.newPrice,
        },
        { new: true },
      );

      if (!updatedBooking) {
        throw new NotFoundException('Booking not found');
      }

      // 2. Fetch the user and send a push notification if an FCM token exists
      const user = await this.userModel.findById(updatedBooking.userId);
      if (user?.fcmToken) {
        const message = {
          notification: {
            title: 'Cambios en tu servicio',
            body: `Tu servicio tiene un nuevo precio de: $${updateDto.newPrice}, entra ahora para verificarlo.`,
          },
          token: user.fcmToken,
        };

        messaging()
          .send(message)
          .then((response) =>
            console.log('Successfully sent message:', response),
          )
          .catch((error) => console.error('Error sending message:', error));
      }

      // 3. Return the updated booking
      return updatedBooking;
    } catch (error) {
      console.error('Error updating booking type:', error);
      throw new InternalServerErrorException('Failed to update booking type.');
    }
  }

  // New Method: get accepted bookings by provider (status "confirmed")
  async getAcceptedBookingsByProvider(
    providerId: string,
    date?: string,
  ): Promise<Booking[]> {
    const query: FilterQuery<BookingDocument> = {
      providerId: new Types.ObjectId(providerId),
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
    console.log('product', product);

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
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.image,
        includeSupplies: product.includeSupplies,
        includeTools: product.includeTools,
        rate: product.rate,
        rating: product.rating,
        jobs: product.jobs,
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
