import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  profilePicture?: string;
}
