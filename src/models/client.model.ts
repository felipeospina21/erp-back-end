import { Schema, model } from 'mongoose';

export interface IClient {
  addres1: string;
  addres2?: string;
  city: string;
  department: string;
  discount: number;
  email?: string;
  idNumber: string;
  idType: string;
  name?: string;
}

const clientSchema = new Schema<IClient>(
  {
    addres1: { type: String, required: true },
    addres2: { type: String },
    city: { type: String, required: true },
    department: { type: String, required: true },
    discount: { type: Number, required: true },
    email: { type: String },
    idNumber: { type: String, required: true, unique: true },
    idType: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Client = model<IClient>('Client', clientSchema);
