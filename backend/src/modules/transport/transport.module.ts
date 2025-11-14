import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {TransportController} from './transport.controller';
import {TransportService} from './transport.service';
import {transportProvider} from './transport.provider';

@Module({
  imports: [SharedModule],
  controllers: [TransportController],
  providers: [TransportService, ...transportProvider],
  exports: [TransportService]
})
export class TransportModule {
}