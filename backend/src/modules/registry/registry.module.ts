import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {RegistryController} from './registry.controller';
import {RegistryService} from './registry.service';
import {registryProvider} from './registry.provider';

@Module({
  imports: [SharedModule],
  controllers: [RegistryController],
  providers: [RegistryService, ...registryProvider],
  exports: [RegistryService]
})
export class RegistryModule {
}