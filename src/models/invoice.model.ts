import { Schema, model } from 'mongoose';

export interface IInvoice {
  count: number;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);
