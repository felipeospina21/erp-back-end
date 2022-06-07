import { Schema, model } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, lowercase: true },
});

export const Category = model<ICategory>('Category', categorySchema);
