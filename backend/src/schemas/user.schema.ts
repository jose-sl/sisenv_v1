import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    rol: String,
    age: String,
    status: String,
    nic: String,
    pass: String
}, { versionKey: false });