import {Connection} from 'mongoose';
import {UserSchema} from '../../schemas/user.schema';

export const userProvider = [
  {
    provide: 'UserToken',
    useFactory: (connection: Connection) => connection.model('user', UserSchema, 'user'),
    inject: ['DbConnectionToken'],
  },
];