import {Connection} from 'mongoose';
import {TransportSchema} from '../../schemas/transport.schema';

export const transportProvider = [
  {
    provide: 'TransportToken',
    useFactory: (connection: Connection) => connection.model('transport', TransportSchema, 'transport'),
    inject: ['DbConnectionToken'],
  },
];