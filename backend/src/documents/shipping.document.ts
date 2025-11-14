import { Document } from 'mongoose';

export interface ShippingDocument extends Document {
    packageId: string;
    placeOriginId: string;
    placeDestinyId: string;
    transportId: string;
    pilotId: string;
    status: string;
}