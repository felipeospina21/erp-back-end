import { Schema, model } from 'mongoose';

export interface IConsecutive {
  name: string;
  count: number;
}

const consecutiveSchema = new Schema<IConsecutive>(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Consecutive = model<IConsecutive>('Consecutive', consecutiveSchema);
