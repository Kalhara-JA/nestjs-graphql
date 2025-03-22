import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Prop()
  @Field({ nullable: true })
  uid?: string;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  firebaseId: string;

  @Prop({ required: true })
  @Field()
  phoneNumber: string;

  @Prop()
  @Field({ nullable: true })
  profilePicture?: string;

  @Prop()
  @Field({ nullable: true })
  fcmToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
