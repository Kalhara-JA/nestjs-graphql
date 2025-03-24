import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LegalData } from './entities/legal-data.entity';
import { Address } from './entities/address.entity';
import { FavoriteProduct } from '../products/entities/favourite-product.entity';
import { UsersResponse } from './entities/users-response.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'getUser', nullable: true })
  async getUser(
    @Args('firebaseId', { type: () => String }) firebaseId: string,
  ): Promise<User> {
    return this.userService.findByFirebaseId(firebaseId);
  }

  @Query(() => User, { name: 'getUserById', nullable: true })
  async getUserById(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query(() => [User], { name: 'getUsers', nullable: 'itemsAndList' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => UsersResponse, { name: 'getUsersPaginated', nullable: true })
  async getUsersPaginated(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ): Promise<UsersResponse> {
    return this.userService.getUsersPaginated(page, pageSize);
  }

  @Query(() => [Address], {
    name: 'getAddressesByUserId',
    nullable: 'itemsAndList',
  })
  async getAddressesByUserId(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Address[]> {
    return this.userService.getAddressesByUserId(userId);
  }

  @Query(() => LegalData, { name: 'getLegalDataByUserId', nullable: true })
  async getLegalDataByUserId(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<LegalData> {
    return this.userService.getLegalDataByUserId(userId);
  }

  @Query(() => String, { name: 'getUserFCMTokenById', nullable: true })
  async getUserFCMTokenById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    return this.userService.getUserFCMTokenById(id);
  }

  @Query(() => [FavoriteProduct], {
    name: 'getFavoriteProductsByUserId',
    nullable: 'itemsAndList',
  })
  async getFavoriteProductsByUserId(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<FavoriteProduct[]> {
    return this.userService.getFavoriteProductsByUserId(userId);
  }

  @Mutation(() => User, { name: 'createUser', nullable: true })
  async createUser(@Args() createUserData: CreateUserDto): Promise<User> {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User, { name: 'updateUser', nullable: true })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args() input: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { nullable: true })
  async updateUserFCMToken(
    @Args('id', { type: () => ID }) id: string,
    @Args('fcmToken', { type: () => String }) fcmToken: string,
  ): Promise<User> {
    return this.userService.updateUserFCMToken(id, fcmToken);
  }

  @Mutation(() => Address, { nullable: true })
  async createAddress(
    @Args('name', { type: () => String }) name: string,
    @Args('address', { type: () => String }) address: string,
    @Args('userId', { type: () => ID }) userId: string,
    @Args('latitude', { type: () => String, nullable: true }) latitude?: string,
    @Args('longitude', { type: () => String, nullable: true })
    longitude?: string,
    @Args('additional', { type: () => String, nullable: true })
    additional?: string,
  ): Promise<Address> {
    return this.userService.createAddress({
      name,
      address,
      userId,
      latitude,
      longitude,
      additional,
    });
  }

  @Mutation(() => LegalData, { nullable: true })
  async createLegalData(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('personType', { type: () => String }) personType: string,
    @Args('documentType', { type: () => String }) documentType: string,
    @Args('documentNumber', { type: () => String }) documentNumber: string,
  ): Promise<LegalData> {
    return this.userService.createLegalData({
      userId,
      personType,
      documentType,
      documentNumber,
    });
  }

  @Mutation(() => LegalData, { nullable: true })
  async updateLegalData(
    @Args('id', { type: () => ID }) id: string,
    @Args('personType', { type: () => String, nullable: true })
    personType?: string,
    @Args('documentType', { type: () => String, nullable: true })
    documentType?: string,
    @Args('documentNumber', { type: () => String, nullable: true })
    documentNumber?: string,
  ): Promise<LegalData> {
    return this.userService.updateLegalData(id, {
      personType,
      documentType,
      documentNumber,
    });
  }
}
