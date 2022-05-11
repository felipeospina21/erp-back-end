import { Schema, model } from 'mongoose';

export interface IProduct {
  alias: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

const productSchema = new Schema<IProduct>(
  {
    alias: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
