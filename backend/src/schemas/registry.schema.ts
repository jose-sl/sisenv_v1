import { Schema } from 'mongoose';

export const RegistrySchema = new Schema({
    user: String,
    module: String,
    action: String,
}, { versionKey: false });