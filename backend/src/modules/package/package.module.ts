import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {PackageController} from './package.controller';
import {PackageService} from './package.service';
import {packageProvider} from './package.provider';

@Module({
  imports: [SharedModule],
  controllers: [PackageController],
  providers: [PackageService, ...packageProvider],
  exports: [PackageService]
})
export class PackageModule {
}