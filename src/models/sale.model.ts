import { Schema, model } from 'mongoose';
import { IClient } from './client.model';
import { IProduct } from './product.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
export interface IOrderedProduct {
  item: IProduct;
  discount: number;
  listId: string;
  quantity: number;
  subtotal: number;
}
export interface ISale {
  clientInfo: IClient;
  deliveryCity: string;
  orderedProducts: IOrderedProduct[];
  salesChannel: string;
  subtotal: number;
  tax: number;
  total: number;
}

const orderedProductsSchema = new Schema<IOrderedProduct>({
  item: { type: Schema.Types.ObjectId, ref: 'Product', required: true, autopopulate: true },
  discount: { type: Number, required: true },
  listId: { type: String, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

orderedProductsSchema.plugin(mongooseAutoPopulate);

const saleSchema = new Schema<ISale>(
  {
    clientInfo: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
      autopopulate: true,
    },
    deliveryCity: {
      type: String,
      required: true,
    },
    orderedProducts: {
      type: [orderedProductsSchema],
      required: true,
    },
    salesChannel: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

saleSchema.plugin(mongooseAutoPopulate);

export const Sale = model<ISale>('Sale', saleSchema);
