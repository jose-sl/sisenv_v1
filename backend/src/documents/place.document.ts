import { Document } from 'mongoose';

export interface PlaceDocument extends Document {
    name: string;
    address: string;
}