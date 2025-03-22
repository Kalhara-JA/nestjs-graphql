// src/booking/booking-detail.type.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { Booking } from './booking.entity';
import { User } from '../../users/entities/user.entity';
import { Address } from '../../users/entities/address.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { ProductDetail } from '../../products/entities/product-detail.entity';

@ObjectType()
export class BookingDetail {
  @Field(() => Booking)
  booking: Booking;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => Provider, { nullable: true })
  provider?: Provider;

  @Field(() => ProductDetail, { nullable: true })
  product?: ProductDetail;
}
