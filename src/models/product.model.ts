import { Schema, model } from 'mongoose';

export interface IProduct {
  alias: string;
  name: string;
  price: number;
  stock: number;
  subtotal?: number;
}

const productSchema = new Schema<IProduct>(
  {
    alias: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    subtotal: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product', productSchema);
