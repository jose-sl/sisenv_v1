import { Schema } from 'mongoose';

export const PlaceSchema = new Schema({
    name: String,
    address: String
}, { versionKey: false });