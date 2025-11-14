import {Connection} from 'mongoose';
import {RegistrySchema} from '../../schemas/registry.schema';

export const registryProvider = [
  {
    provide: 'RegistryToken',
    useFactory: (connection: Connection) => connection.model('registry', RegistrySchema, 'registry'),
    inject: ['DbConnectionToken'],
  },
];