import { Category, ICategory } from '../models';
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export function createCategory(req: Request, res: Response) {
  const newCategory = createNewElement(Category, req.body);
  controllerResponse(newCategory, 201, 400, res);
}

export function getCategories(req: Request, res: Response) {
  const categories = findAll(Category);
  controllerResponse(categories, 200, 400, res);
}

export function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const product = findById(Category, id);
  controllerResponse(product, 200, 400, res);
}

export function deleteCategoryById(req: Request, res: Response) {
  const { _id: id } = req.body as ICategory;
  const deletedCategory = deletetById(Category, id);
  controllerResponse(deletedCategory, 200, 400, res);
}
