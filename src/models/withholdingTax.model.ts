import { Schema, model } from 'mongoose';

export interface IWithholdingTax {
  _id: string;
  concept: string;
  base: number;
  percentage: number;
}

const withholdingTaxSchema = new Schema<IWithholdingTax>(
  {
    concept: { type: String, required: true },
    base: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const WithholdingTax = model<IWithholdingTax>('WithholdingTax', withholdingTaxSchema);
