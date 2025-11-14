import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {userProvider} from './user.provider';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider],
  exports: [UserService]
})
export class UserModule {
}