import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';
import { ProviderService } from './providers.service';
import { ProviderResolver } from './providers.resolver';
import {
  ProviderPreferences,
  ProviderPreferencesSchema,
} from './entities/provider-preferences.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
      { name: ProviderPreferences.name, schema: ProviderPreferencesSchema },
    ]),
  ],
  providers: [ProviderService, ProviderResolver],
  exports: [ProviderService],
})
export class ProvidersModule {}
