import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule
  ],
  providers: [],
  exports: [
    DatabaseModule,
    HttpModule
  ]
})
export class SharedModule {
}
