import type { IClient, IProduct, ISale, IUser, IWithholdingTax } from '../../models';
import { Model } from 'mongoose';
import Logger from '../../utils/logger';

export type ModelsTypes = IClient | IProduct | ISale | IUser | IWithholdingTax;

export async function createNewElement(Schema: Model<any>, payload: ModelsTypes) {
  try {
    const newElement = await Schema.create(payload);
    return newElement;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findAll(Schema: Model<any>, sortBy?: string) {
  try {
    const elementsList = await Schema.find().sort(sortBy);
    return elementsList;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findById(Schema: Model<any>, id: string) {
  try {
    const element = await Schema.findById(id);
    return element;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findOneByField(Schema: Model<any>, field: { [key: string]: string }) {
  try {
    const element = await Schema.findOne(field);
    return element;
  } catch (error) {
    Logger.error(error);
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
