import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {PlaceController} from './place.controller';
import {PlaceService} from './place.service';
import {placeProvider} from './place.provider';

@Module({
  imports: [SharedModule],
  controllers: [PlaceController],
  providers: [PlaceService, ...placeProvider],
  exports: [PlaceService]
})
export class PlaceModule {
}