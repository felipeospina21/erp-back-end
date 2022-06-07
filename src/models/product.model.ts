import { Schema, model } from 'mongoose';
import { ICategory } from './category.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface IProduct {
  _id: string;
  category: ICategory;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

const productSchema = new Schema<IProduct>(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, autopopulate: { select: 'name -_id' } },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseAutoPopulate);

export const Product = model<IProduct>('Product', productSchema);
