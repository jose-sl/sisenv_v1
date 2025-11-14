import {Connection} from 'mongoose';
import {PackageSchema} from '../../schemas/package.schema';

export const packageProvider = [
  {
    provide: 'PackageToken',
    useFactory: (connection: Connection) => connection.model('package', PackageSchema, 'package'),
    inject: ['DbConnectionToken'],
  },
];