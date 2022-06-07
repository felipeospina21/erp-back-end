import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, deleteCategoryById } from '../controllers';

export const categoryRouter: Router = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/', deleteCategoryById);
