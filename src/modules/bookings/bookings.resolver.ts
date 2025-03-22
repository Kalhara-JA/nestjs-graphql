import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BookingService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { UpdateBookingTypeDto } from './dto/update-booking-type.dto';
import { BookingDetail } from './entities/booking-detail.entity'; // Assume this type is defined

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => Booking, { name: 'getBookingById' })
  async getBooking(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Booking> {
    return this.bookingService.findById(id);
  }

  @Query(() => [Booking], { name: 'getBookingsByUser' })
  async getBookingsByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Booking[]> {
    return this.bookingService.findByUser(userId);
  }

  @Query(() => [Booking], { name: 'getBookingsByProvider' })
  async getBookingsByProvider(
    @Args('providerId', { type: () => ID }) providerId: string,
  ): Promise<Booking[]> {
    return this.bookingService.findByProvider(providerId);
  }

  // New Query: Get accepted (confirmed) bookings by provider for an optional date range
  @Query(() => [Booking], { name: 'getAcceptedBookingsByProvider' })
  async getAcceptedBookingsByProvider(
    @Args('providerId', { type: () => ID }) providerId: string,
    @Args('date', { type: () => String, nullable: true }) date?: string,
  ): Promise<Booking[]> {
    return this.bookingService.getAcceptedBookingsByProvider(providerId, date);
  }

  // New Query: Get booking details (aggregated info)
  @Query(() => BookingDetail, { name: 'getBookingDetail' })
  async getBookingDetail(
    @Args('bookingId', { type: () => ID }) bookingId: string,
  ): Promise<BookingDetail> {
    return this.bookingService.getBookingDetail(bookingId);
  }

  @Mutation(() => Booking)
  async createBooking(
    @Args('input') input: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.create(input);
  }

  @Mutation(() => Booking)
  async updateBookingStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateBookingStatusDto,
  ): Promise<Booking> {
    return this.bookingService.updateStatus(id, input);
  }

  @Mutation(() => Booking)
  async updateBookingType(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateBookingTypeDto,
  ): Promise<Booking> {
    return this.bookingService.updateType(id, input);
  }
}
