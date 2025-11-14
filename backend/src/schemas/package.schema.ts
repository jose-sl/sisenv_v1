import { Schema } from 'mongoose';

export const PackageSchema = new Schema({
    name: String,
    weight: String,
    status: String
}, { versionKey: false });
