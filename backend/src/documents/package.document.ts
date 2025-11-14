import { Document } from 'mongoose';

export interface PackageDocument extends Document {
    name: string;
    weight: string;
    status: string;
}