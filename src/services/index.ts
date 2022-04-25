import type { IClient, IProduct, ISale } from '../models';
import { Model } from 'mongoose';

export interface Populate {
  path: string;
  select?: string;
}

export async function createNewElement(Schema: Model<any>, payload: IProduct | IClient | ISale) {
  try {
    const newElement = await Schema.create(payload);
    return newElement;
  } catch (error) {
    throw error;
  }
}

export async function findAll(Schema: Model<any>) {
  try {
    const elementsList = await Schema.find();
    return elementsList;
  } catch (error) {
    throw error;
  }
}

export async function findById(Schema: Model<any>, id: string) {
  try {
    const element = await Schema.findById(id);
    return element;
  } catch (error) {
    throw error;
  }
}

export async function deletetById(Schema: Model<any>, id: string) {
  try {
    const deletedElement = await Schema.findByIdAndDelete(id);
    if (!deletedElement) {
      throw new Error('Element not found');
    }
    return deletedElement;
  } catch (error) {
    throw String(error);
  }
}

export async function updateById(Schema: Model<any>, id: string, update: object) {
  try {
    const updatedElement = await Schema.findByIdAndUpdate(id, update);
    if (!updatedElement) {
      throw new Error('Element not found');
    }
    return updatedElement;
  } catch (error) {
    throw String(error);
  }
}
