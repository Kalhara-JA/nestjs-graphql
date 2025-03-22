import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEmail } from 'class-validator';

@InputType()
export class UpdateProviderDto {
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
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  image?: string;
}
