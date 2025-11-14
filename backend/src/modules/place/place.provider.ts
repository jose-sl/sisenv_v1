import {Connection} from 'mongoose';
import {PlaceSchema} from '../../schemas/place.schema';

export const placeProvider = [
  {
    provide: 'PlaceToken',
    useFactory: (connection: Connection) => connection.model('place', PlaceSchema, 'place'),
    inject: ['DbConnectionToken'],
  },
];