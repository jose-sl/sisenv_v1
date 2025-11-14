import { Schema } from 'mongoose';

export const ShippingSchema = new Schema({
    packageId: String,
    placeOriginId: String,
    placeDestinyId: String,
    transportId: String,
    pilotId: String,
    status: String
}, { versionKey: false });