import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';
import { ProviderService } from './providers.service';
import { ProviderResolver } from './providers.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  providers: [ProviderService, ProviderResolver],
  exports: [ProviderService],
})
export class ProvidersModule {}
