import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@ArgsType()
export class CreateProviderDto {
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
  phone: string;

  @Field()
  @IsNotEmpty()
  image: string;

  @Field()
  @IsNotEmpty()
  firebaseId: string;
}
