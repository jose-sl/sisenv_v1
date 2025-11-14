import { Document } from 'mongoose';

export interface TransportDocument extends Document {
    type: string;
    number_ident: string;
    max_weight: string;
}