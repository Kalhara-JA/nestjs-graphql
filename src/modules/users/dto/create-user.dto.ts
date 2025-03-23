import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

@ArgsType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  uid: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  firebaseId: string;

  @Field()
  @IsNotEmpty()
  phoneNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  profilePicture?: string;
}
