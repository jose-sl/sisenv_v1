import { Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    rol: string;
    age: string;
    status: string;
    nic: string;
    pass: string;
}