import { Document } from 'mongoose';

export interface RegistryDocument extends Document {
    user: string;
    module: string;
    action: string;
}