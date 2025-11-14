import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {ShippingController} from './shipping.controller';
import {ShippingService} from './shipping.service';
import {shippingProvider} from './shipping.provider';

@Module({
  imports: [SharedModule],
  controllers: [ShippingController],
  providers: [ShippingService, ...shippingProvider],
  exports: [ShippingService]
})
export class ShippingModule {
}