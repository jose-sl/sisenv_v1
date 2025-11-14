import { Schema } from 'mongoose';

export const TransportSchema = new Schema({
    type: String,
    number_ident: String,
    max_weight: String
}, { versionKey: false });