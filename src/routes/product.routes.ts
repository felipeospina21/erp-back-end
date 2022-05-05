import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
} from '../controllers';
import { saveImage, errorHandler } from '../middlewares';

export const productRouter: Router = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', saveImage.single('image'), createProduct, errorHandler);
productRouter.delete('/', deleteProductById);
productRouter.put('/', updateProductById);
