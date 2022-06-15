import { Schema, model } from 'mongoose';
import { IClient } from './client.model';
import { IProduct } from './product.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';
export interface IOrderedProduct {
  item: IProduct;
  discount: number;
  quantity: number;
  rowTotal: number;
}
export interface ISale {
  clientId: IClient;
  deliveryCity: string;
  orderedProducts: IOrderedProduct[];
  paymentTerm: number;
  subtotal: number;
  tax: number;
  total: number;
}

const orderedProductsSchema = new Schema<IOrderedProduct>({
  item: { type: Schema.Types.ObjectId, ref: 'Product', required: true, autopopulate: { select: '-image' } },
  discount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  rowTotal: { type: Number, required: true },
});

orderedProductsSchema.plugin(mongooseAutoPopulate);

const saleSchema = new Schema<ISale>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
      autopopulate: { select: 'name' },
    },
    deliveryCity: {
      type: String,
      required: true,
    },
    orderedProducts: {
      type: [orderedProductsSchema],
      required: true,
    },
    paymentTerm: {
      type: Number,
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
