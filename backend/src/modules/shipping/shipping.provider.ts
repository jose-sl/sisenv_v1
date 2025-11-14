import {Connection} from 'mongoose';
import {ShippingSchema} from '../../schemas/shipping.schema';

export const shippingProvider = [
  {
    provide: 'ShippingToken',
    useFactory: (connection: Connection) => connection.model('shipping', ShippingSchema, 'shipping'),
    inject: ['DbConnectionToken'],
  },
];