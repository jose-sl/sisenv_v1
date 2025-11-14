import { Package } from "./package.model";
import { Place } from './place.model';
import { Transport } from './transport.model';
import { User } from './user.model';

export interface Shipping {
    packageId: string;
    placeOriginId: string;
    placeDestinyId: string;
    transportId: string;
    pilotId: string;
    status: string;
    package: Package;
    placeOrigin: Place;
    placeDestiny: Place;
    transport: Transport;
    pilot: User;
}