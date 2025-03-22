import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { Address, AddressSchema } from './entities/address.entity';
import { LegalData, LegalDataSchema } from './entities/legal-data.entity';
import {
  FavoriteProduct,
  FavoriteProductSchema,
} from '../products/entities/favourite-product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
      { name: LegalData.name, schema: LegalDataSchema },
      { name: FavoriteProduct.name, schema: FavoriteProductSchema },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
