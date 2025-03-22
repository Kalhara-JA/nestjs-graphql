import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { OffersModule } from './modules/offers/offers.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { ProductsModule } from './modules/products/products.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://test-user-mongo:dbpasswordx12345@main.v6tdble.mongodb.net/?retryWrites=true&w=majority&appName=main',
    ),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
    ProductsModule,
    ProvidersModule,
    BookingsModule,
    CategoriesModule,
    ReviewsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
