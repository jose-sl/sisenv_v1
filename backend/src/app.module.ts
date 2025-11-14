import { Module } from '@nestjs/common';
import { PackageModule } from './modules/package/package.module';
import { PlaceModule } from './modules/place/place.module';
import { TransportModule } from './modules/transport/transport.module';
import { UserModule } from './modules/user/user.module';
import { RegistryModule } from './modules/registry/registry.module';
import { ShippingModule } from './modules/shipping/shipping.module';

@Module({
  imports: [
    PackageModule,
    PlaceModule,
    TransportModule,
    UserModule,
    RegistryModule,
    ShippingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
